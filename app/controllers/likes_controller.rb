class LikesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @user = current_user
    @user.like!(Post.find(params[:likeable_id]))
  end
  
end