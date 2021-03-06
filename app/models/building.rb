class Building < ActiveRecord::Base
  belongs_to :neighborhood
  has_many :users

  def coords
    Geocoder.coordinates(self.name)
  end
end