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
  
  def read_all
    current_user.unread_notifications.each do |noti|
      noti.read!
    end
    if current_user.unread_notifications.empty?
      respond_to do |format|
        format.json{ render json: true }
      end
    else
      respond_to do |format|
        format.json{ render nothing: true }
      end
    end
  end
  
  def read_chats
    convo = Mailboxer::Conversation.find(params[:convo_id].to_i)
    sender = (convo.participants - [current_user]).first
    notis = current_user.unread_chat_notifications.select{|n| n.sender == sender }
    notis.each{ |noti| noti.read! }
    respond_to do |format|
      format.json{ render json: true}
    end
  end
  
  def unread_chat
    respond_to do |format|
      format.json{render json: current_user.unread_chat_notifications.to_json}
    end    
  end
  
  private
  def notification_params
    params.require(:notification).permit(:category,:user_id)
  end
end
