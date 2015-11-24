class MessagesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    if params["convo_id"]
      # if responding to conversation
      conversation = Mailboxer::Conversation.find(params["convo_id"])
      current_user.reply_to_conversation(conversation, params[:message][:body])
      render :json => conversation.messages
    else
      # if creating new conversation
      recipient = User.find(params['recipients'])
      conversation = current_user.send_message(recipient, params[:message][:body], "Subject").conversation
      render :json => conversation.messages
    end
    #redirect_to conversation_path(conversation)
  end
end
