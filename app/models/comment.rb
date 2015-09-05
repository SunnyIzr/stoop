class Comment < ActiveRecord::Base

  include ActsAsCommentable::Comment

  belongs_to :commentable, :polymorphic => true

  default_scope -> { order('created_at ASC') }

  # NOTE: install the acts_as_votable plugin if you
  # want user to vote on the quality of comments.
  #acts_as_voteable

  # NOTE: Comments belong to a user
  belongs_to :user
  
  acts_as_likeable
  acts_as_mentioner
  
  include PublicActivity::Model
  tracked
  
  def data(current_user=nil)
    hash = self.attributes
    hash[:created_at_formatted] = self.created_at.strftime('%m/%d/%y %I:%M%P')
    hash[:user] = self.user.attributes
    hash[:user][:name] = self.user.name
    hash[:user][:avatar] = self.user.avatar
    hash[:like_count] = self.likers(User).size
    hash[:current_user_like] =  current_user.nil? ? nil : current_user.likes?(self)
    hash[:likers] = self.likers(User)
    hash[:post] = self.commentable.data(current_user)
    hash
  end
end
