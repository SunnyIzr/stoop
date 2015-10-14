class YelpController < ApplicationController
  before_filter :authenticate_user!
  
  def search
    term = params[:term].downcase
    coords = current_user.building.coords
    render json: YelpApi.search_by_coords(term,coords).businesses.map{ |biz| {id: biz.id, name: biz.name} }
  end
end