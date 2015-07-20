class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  acts_as_liker
  acts_as_mentionable
         
  belongs_to :building
  belongs_to :neighborhood
  has_many :posts
  
  acts_as_messageable
  
  def name
    return self.first_name.to_s + ' ' + self.last_name.to_s
  end
  
end
