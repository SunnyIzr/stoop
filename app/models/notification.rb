class Notification < ActiveRecord::Base
  belongs_to :user
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'
  
  def read!
    self.update!(read: true)
  end
  
  # Types: comment, post_like, comment_like
  
  def desc
    if self.category == 'comment'
      'commented on your post'
    elsif self.category == 'post_like'
      'liked your post'
    elsif self.category == 'comment_like'
      'liked your comment'
    end
        
  end
  
  def html
    string = '<img src="' + self.sender.avatar.to_s + '"><a href="/users/"' + self.sender.id.to_s + '">' + self.sender.name + '</a> ' + self.desc
    string.html_safe
  end
  
end
