class LikesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    user = current_user
    object = Object.const_get(like_params[:likeable_type]).find(like_params[:likeable_id])
    if user.likes?(object)
      user.unlike!(object)
      @data = object.data(current_user)
      respond_to do |format|
        format.json { render json: @data}
        format.html { redirect_to root_path }
      end      
    else
      user.like!(object)
      if like_params[:likeable_type] == 'Post'
        Notification.create(category: 'post_like',user: object.account ,sender: user)
      elsif like_params[:likeable_type] == 'Comment'
        Notification.create(category: 'comment_like',user: object.user ,sender: user)
      end
      @data = object.data(current_user)
      respond_to do |format|
        format.json { render json: @data}
        format.html { redirect_to root_path }
      end
    end
  end
  
  private
  
  def like_params
    params.require(:like).permit(:likeable_id,:likeable_type)
  end
  
end