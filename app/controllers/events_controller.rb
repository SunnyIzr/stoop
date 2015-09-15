class EventsController < ApplicationController
  before_filter :authenticate_user!
  
  def index
    @events = Event.all
  end
  
  def show
    @event = Event.find(params[:id])
    @coords = @event.coords
    @editable = @event.creator == current_user
  end
  
  def create
    event = Event.new(event_params)
    if event.save
      redirect_to event
    else
      redirect_to events_path
    end
  end
  
  def update
    @event = Event.find(params[:id])
    unless event_params[:location].nil?
      location = @event.location
      location[event_params[:location].first[0]] = event_params[:location].first[1]
      @event.update(location: location)
    else
      @event.update!(event_params)
    end
    if @event.creator == current_user
      if @event.save
        respond_to do |format|
          format.json{ render json: @event }
          format.html{ redirect_to @event }
        end
      else
        respond_to do |format|
          format.json{ render nothing: true }
          format.html{ redirect_to root_path }
        end
      end
    end
  end
  
  def update_time
    @event = Event.find(params[:id])
    updates = {}
    unless params[:event][:start_time].nil?
      updates[:hour] = @event.start_time.hour
      updates[:min] = @event.start_time.min
      updates[:day] = Date.parse(params[:event][:start_time]).day
      updates[:month] = Date.parse(params[:event][:start_time]).month
      updates[:year] = Date.parse(params[:event][:start_time]).year
    end
    unless params[:event][:hour].nil?
      updates[:hour] = DatetimeHelper.hour(@event.start_time.strftime('%P'), params[:event][:hour])
    end
    unless params[:event][:min].nil?
      updates[:min] = params[:event][:min] 
    else
      updates[:min] = @event.start_time.min
    end
    unless params[:event][:meridian].nil?
      updates[:hour] = DatetimeHelper.change_meridian(@event.start_time.hour,params[:event][:meridian])
    end
    new_start_time = @event.start_time.change(updates)
    if @event.creator == current_user
      if @event.update!(start_time: new_start_time)
        respond_to do |format|
          format.json{ render json: @event }
          format.html{ redirect_to @event }
        end
      else
        respond_to do |format|
          format.json{ render nothing: true }
          format.html{ redirect_to root_path }
        end
      end
    end
  end
  
  private
  def event_params
    params.require(:event).permit(:name,:about,:event_type,:start_time,:creator_id,:cover,:location =>[:street,:city,:state])
  end
  
end