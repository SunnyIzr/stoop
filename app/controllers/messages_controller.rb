class MessagesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    recipient = User.find(params['recipients'])
    conversation = current_user.send_message(recipient, params[:message][:body], "Subject").conversation
    render :json => conversation.messages
    #redirect_to conversation_path(conversation)
  end
end
