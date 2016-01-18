module SignupHelper
  def neighborhood_options
    s = '<option disabled selected="selected">Neighborhood</option>'
    Neighborhood.all.each do |neighborhood|
      s << "<option value='#{neighborhood.id}'>#{neighborhood.name}</option>"
    end
    s.html_safe
  end
  
  def building_options
    s = '<option disabled selected="selected">Building</option>'
    Building.all.each do |building|
      s << "<option class='hide building neighborhood-#{building.neighborhood.id}' value='#{building.id}'>#{building.name}</option>"
    end
    s.html_safe
  end
  
  def unhidden_building_options
    s = '<option disabled selected="selected">Building</option>'
    Building.all.each do |building|
      s << "<option class='building neighborhood-#{building.neighborhood.id}' value='#{building.id}'>#{building.name}</option>"
    end
    s.html_safe
  end
  
  
  
  def state_options
    states = Array[ 
                "Alaska",
                "Alabama",
                "Arkansas",
                "Arizona",
                "California",
                "Colorado",
                "Connecticut",
                "Delaware",
                "Florida",
                "Georgia",
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
                "Rhode Island",
                "South Carolina",
                "South Dakota",
                "Tennessee",
                "Texas",
                "Utah",
                "Virginia",
                "Vermont",
                "Washington",
                "Wisconsin",
                "West Virginia",
                "Wyoming" ]
    s = '<option disabled selected="selected">State</option>'
    states.each do |state|
      s << "<option value='#{state}'>#{state}</option>"
    end
    s.html_safe
  end
  
  def industry_options
    industries = [{value: 'restaurant/bar', text: 'Restaurant/Bar'},
            {value: 'retail', text: 'Retail'},
            {value: 'nightclub', text: 'Nightclub'},
            {value: 'beauty/grooming', text: 'Beauty/Grooming'},
            {value: 'hotel', text: 'Hotel'}]
    s = '<option disabled selected="selected">Industry</option>'
    industries.each do |industry|
      s << "<option value='#{industry[:value]}'>#{industry[:text]}</option>"
    end
    s.html_safe
  end
end