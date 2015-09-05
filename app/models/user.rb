class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  acts_as_liker
  acts_as_mentionable
  acts_as_follower
  acts_as_followable
  acts_as_messageable
         
  belongs_to :building
  has_many :posts, dependent: :destroy
  
  has_many :events, class_name: 'Event', foreign_key: 'creator_id', dependent: :destroy
  has_many :incoming_invites, class_name: 'Invite', foreign_key: 'attendee_id', dependent: :destroy
  has_many :invited_events, through: :incoming_invites, class_name: 'Event', foreign_key: 'attendee_id', dependent: :destroy
  
  serialize :contact, Hash
  
  has_attached_file :avatar,
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/   
  
  has_attached_file :cover,
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :cover, :content_type => /\Aimage\/.*\Z/   
  
  include PublicActivity::Model
  tracked
  
  def name
    return self.first_name.to_s + ' ' + self.last_name.to_s
  end
  
  def neighborhood
    self.building.neighborhood
  end
  
  def mailboxer_email(object)
    nil
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
  
end
