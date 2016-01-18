class Neighborhood < ActiveRecord::Base
  has_many :buildings
  has_many :users, through: :buildings
  
  def coords
    Geocoder.coordinates(self.name + ', New York, NY')
  end
  
end