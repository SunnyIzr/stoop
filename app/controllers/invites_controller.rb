class InvitesController < ApplicationController
  before_filter :authenticate_user!
  
  def create
    invite = Invite.where(attendee_id: invite_params[:attendee_id],event_id: invite_params[:event_id]).first
    if invite.nil?
      @invite = Invite.new(invite_params)
    else
      @invite = invite
      @invite.update(invite_params)
    end
    if @invite.save
      respond_to do |format|
        format.html { redirect_to @invite.event }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
        format.html { redirect_to root_path }
      end
    end
  end

  def create_bulk
    @event = Event.find(params[:event_id])
    params[:attendees].each do |attendee_id|
      Invite.create(event_id: @event.id, attendee_id: attendee_id)
    end
    redirect_to @event
  end
  
  private
  def invite_params
    params.require(:invite).permit(:event_id,:attendee_id,:accepted)
  end
  
end