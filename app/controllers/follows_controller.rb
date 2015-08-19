class FollowsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @user = current_user
    @user.follow!(User.find(params[:followable_id]))
  end
  
end