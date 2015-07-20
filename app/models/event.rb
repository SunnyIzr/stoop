class Event < ActiveRecord::Base
  has_many :invites
  has_many :attendees, through: :invites
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id' 
  
  def confirmed_guests
  end
  
  def declined_guests
  end
  
  def unconfirmed_guests
  end
end