module SignupHelper
  def neighborhood_options
    s = '<option disabled selected="selected">Neighborhood*</option>'
    Neighborhood.all.each do |neighborhood|
      s << "<option value='#{neighborhood.id}'>#{neighborhood.name}</option>"
    end
    s.html_safe
  end
  
  def building_options
    s = '<option disabled selected="selected">Building*</option>'
    Building.all.each do |building|
      s << "<option class='hide building neighborhood-#{building.neighborhood.id}' value='#{building.id}'>#{building.name}</option>"
    end
    s.html_safe
  end
end