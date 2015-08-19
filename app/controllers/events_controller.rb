class EventsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @events = Event.all
    @event = Event.new
  end
  
  def show
    @event = Event.find(params[:id])
    if @event.creator == current_user
      render 'edit'
    else
      render 'show'
    end
  end
  
  def create
    event = Event.new(event_params)
    if event.save
      redirect_to event
    else
      redirect_to events_path
    end
  end
  
  private
  def event_params
    params.require(:event).permit(:name,:event_type,:start_time,:creator_id,:location)
  end
  
end