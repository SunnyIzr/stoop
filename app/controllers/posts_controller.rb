class PostsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    post = Post.create(post_params)
    post.account = current_user.poster
    if post.save
      @data = post.data(current_user)
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
    post = Post.find(params[:id])
    @data = post.data(current_user)
    respond_to do |format|
      format.json { render json: @data }
    end
  end
  
  private
  def post_params
    params.require(:post).permit(:body,:image,:location)
  end
end