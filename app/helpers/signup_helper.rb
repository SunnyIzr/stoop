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
  
  def state_options
    states = Array[ 
                "Alaska",
                "Alabama",
                "Arkansas",
                "American Samoa",
                "Arizona",
                "California",
                "Colorado",
                "Connecticut",
                "District of Columbia",
                "Delaware",
                "Florida",
                "Georgia",
                "Guam",
                "Hawaii",
                "Iowa",
                "Idaho",
                "Illinois",
                "Indiana",
                "Kansas",
                "Kentucky",
                "Louisiana",
                "Massachusetts",
                "Maryland",
                "Maine",
                "Michigan",
                "Minnesota",
                "Missouri",
                "Mississippi",
                "Montana",
                "North Carolina",
                "North Dakota",
                "Nebraska",
                "New Hampshire",
                "New Jersey",
                "New Mexico",
                "Nevada",
                "New York",
                "Ohio",
                "Oklahoma",
                "Oregon",
                "Pennsylvania",
                "Puerto Rico",
                "Rhode Island",
                "South Carolina",
                "South Dakota",
                "Tennessee",
                "Texas",
                "Utah",
                "Virginia",
                "Virgin Islands",
                "Vermont",
                "Washington",
                "Wisconsin",
                "West Virginia",
                "Wyoming" ]
    s = ''
    states.each do |state|
        s << "<option>#{state}</option>"
    end
    s.html_safe
  end
end