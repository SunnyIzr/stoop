class CommentsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    comment = Comment.create(comment_params)
    comment.user = current_user
    if comment.save
      # if comment.user != comment.commentable.account
      #   Notification.create(category: 'comment',user: comment.commentable.account, sender: comment.account)
      # end
      @data = comment.data(current_user)
      respond_to do |format|
        format.json { render json: @data}
        format.html { redirect_to root_path }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
        format.html { redirect_to root_path }
      end
    end
  end
  
  def show
    comment = Comment.find(params[:id])
    @data = comment.data(current_user)
    respond_to do |format|
      format.json { render json: @data }
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:title,:comment,:commentable_id,:commentable_type)
  end
end