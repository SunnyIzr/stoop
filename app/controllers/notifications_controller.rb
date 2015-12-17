class NotificationsController < ApplicationController
  def create
    @notification = Notification.new(notification_params)
    @notification.sender = current_user
    if @notification.save
      respond_to do |format|
        format.js { render json: @notification }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
      end
    end
  end
  
  def read
    @notification = Notification.find(params[:id])
    if @notification.read!
      respond_to do |format|
        format.json{ render json: true }
      end
    else
      respond_to do |format|
        format.json{ render nothing: true }
      end
    end
  end
  
  private
  def notification_params
    params.require(:notification).permit(:category,:user_id)
  end
end
