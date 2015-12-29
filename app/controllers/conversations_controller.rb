class ConversationsController < ApplicationController
  before_action :authenticate_user!
  before_action :get_mailbox
  before_action :get_conversation, except: [:index, :empty_trash]
  before_action :get_box, only: [:index]

  def index
    # Full Mailbox Code--saving this for later
    # if @box.eql? "inbox"
    #   @conversations = @mailbox.inbox
    # elsif @box.eql? "sent"
    #   @conversations = @mailbox.sentbox
    # else
    #   @conversations = @mailbox.trash
    # end

    # @conversations = @conversations.paginate(page: params[:page], per_page: 10)
    respond_to do |format|
      format.html { redirect_to conversation_path(current_user.mailbox.conversations.first) }
      format.js
    end
    
  end

  def show
    conversation = current_user.mailbox.conversations.includes(:messages).find(params[:id])
    receipts = conversation.receipts_for(current_user)
    messages = []
    receipts.each do |r|
      messages.push(r.message)
    end
    render :json => {user: current_user, conversation: conversation, receipts: receipts, messages: messages.reverse,other_partcipant: (conversation.participants - [ current_user ]).first}
#    @conversations = current_user.mailbox.conversations.paginate(page: params[:page], per_page: 5)
#    @recipient = (@conversation.participants - [current_user]).first
#    respond_to do |format|
#      format.html
#      if params[:page].nil?
#        format.js
#      else
#        format.js {render 'show_conversations_preview'}
#      end
#    end
  end
  
  def reply
    current_user.reply_to_conversation(@conversation, params[:body])
    flash[:success] = 'Reply sent'
    redirect_to conversation_path(@conversation)
  end
  
  def destroy
    @conversation.move_to_trash(current_user)
    flash[:success] = 'The conversation was moved to trash.'
    redirect_to conversations_path
  end

  def restore
    @conversation.untrash(current_user)
    flash[:success] = 'The conversation was restored.'
    redirect_to conversations_path
  end
  
  def empty_trash
    @mailbox.trash.each do |conversation|
      conversation.receipts_for(current_user).update_all(deleted: true)
    end
    flash[:success] = 'Your trash was cleaned!'
    redirect_to conversations_path
  end
  
  def mark_as_read
    @conversation.mark_as_read(current_user)
    flash[:success] = 'The conversation was marked as read.'
    redirect_to conversations_path
  end

  private
  
  def get_conversation
    @conversation ||= @mailbox.conversations.find(params[:id])
  end

  def get_mailbox
    @mailbox ||= current_user.mailbox
  end
  
  def get_box
    if params[:box].blank? or !["inbox","sent","trash"].include?(params[:box])
      params[:box] = 'inbox'
    end
    @box = params[:box]
  end
end
