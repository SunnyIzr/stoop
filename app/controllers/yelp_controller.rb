class YelpController < ApplicationController
  before_filter :authenticate_user!
  
  def search
    term = params[:term].downcase
    if current_user.business?
      coords = current_user.business.neighborhood.coords
    else
      coords = current_user.building.coords
    end
    render json: YelpApi.search_by_coords(term,coords).businesses.map{ |biz| {id: biz.id, name: biz.name} }
  end
end