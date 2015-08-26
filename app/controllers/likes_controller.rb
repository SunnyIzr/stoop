class LikesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    user = current_user
    post = Post.find(like_params[:likeable_id])
    if user.likes?(post)
      user.unlike!(post)
      @data = post.data(current_user)
      respond_to do |format|
        format.json { render json: @data}
        format.html { redirect_to root_path }
      end      
    else
      user.like!(post)
      @data = post.data(current_user)
      respond_to do |format|
        format.json { render json: @data}
        format.html { redirect_to root_path }
      end
    end
  end
  
  private
  
  def like_params
    params.require(:like).permit(:likeable_id)
  end
  
end