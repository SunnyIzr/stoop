class Invite < ActiveRecord::Base
  belongs_to :event
  belongs_to :attendee, class_name: 'User', foreign_key: 'attendee_id'
  
  def accept!
    self.update!(accepted: true)
  end
  
  def decline!
    self.update!(accepted: false)
  end
end