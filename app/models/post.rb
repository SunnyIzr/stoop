class Post < ActiveRecord::Base
  acts_as_commentable
  acts_as_likeable
  acts_as_mentioner
  
  belongs_to :user
end