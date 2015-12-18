class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
  
  def read!
    self.update!(read: true)
  end
  
  # Types: comment, post_like, comment_like
  
end
