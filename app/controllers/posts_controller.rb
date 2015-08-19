class PostsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @post = Post.create(post_params)
    @post.user = current_user
    if @post.save
      respond_to do |format|
        format.json { render json: @post}
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
  def post_params
    params.require(:post).permit(:body,:image,:location)
  end
end