class CommentsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    p '*'*100
    p 'RUNNING CREATE COMMENTS'
    @comment = Comment.create(comment_params)
    @comment.user = current_user
    if @comment.save
      respond_to do |format|
        format.json { render json: @comment}
        format.html { redirect_to root_path }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
        format.html { redirect_to root_path }
      end
    end
  end
  
  private
  def comment_params
    params.require(:comment).permit(:title,:comment,:commentable_id,:commentable_type)
  end
end