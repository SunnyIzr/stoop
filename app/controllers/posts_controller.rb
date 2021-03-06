class PostsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    post = Post.create(post_params)
    if params[:account_type] == 'User'
      post.account = current_user
      post.neighborhood = current_user.neighborhood
      post.building = current_user.building
    else
      post.account = current_user.business
      post.neighborhood = current_user.business.neighborhood
    end
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
    params.require(:post).permit(:body,:image,:lat,:lng)
  end
end