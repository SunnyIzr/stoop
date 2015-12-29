class FollowsController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    @user = current_user
    @object = Object.const_get(follow_params[:followable_type]).find(follow_params[:followable_id])
    if @user.follows?(@object)
      @user.unfollow!(@object)
      respond_to do |format|
        format.json {render json: false}
        format.html { redirect_to user_path(@object) }
      end
    else
      @user.follow!(@object)
      if ( follow_params[:followable_type] == 'User' )
        Notification.create(category: 'follow', sender: current_user, user: @object)
      end
      respond_to do |format|
        format.json {render json: true}
        format.html { redirect_to user_path(@object) }
      end
    end
  end
  
  private
  def follow_params
    params.require(:follow).permit(:followable_id,:followable_type)
  end
  
end