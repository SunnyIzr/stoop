class MessagesController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    if params["convo_id"]
      # if responding to conversation
      conversation = Mailboxer::Conversation.find(params["convo_id"])
      current_user.reply_to_conversation(conversation, params[:message][:body])
      other_participant = conversation.participants - [current_user]
      message_route = "/conversations/new/#{other_participant.first.id}"
      p "message route conversations"
      p message_route
      PrivatePub.publish_to message_route, :chat_message => "#{params[:message][:body]}"
      render :json => conversation.messages
    else
      # if creating new conversation
      recipient = User.find(params['recipients'])
      conversation = current_user.send_message(recipient, params[:message][:body], "Subject").conversation
      message_route = "/messages/new/#{recipient.id}"
      p "message route messages"
      p message_route
      PrivatePub.publish_to message_route, :chat_message => "#{params[:message][:body]}"
      render :json => conversation.messages
    end
    #redirect_to conversation_path(conversation)
  end
end
