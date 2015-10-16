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
  
  
  has_many :businesses, dependent: :destroy
  accepts_nested_attributes_for :businesses
  has_many :discount_codes
  
  belongs_to :building
  has_many :posts, as: :account, dependent: :destroy
  
  has_many :events, class_name: 'Event', foreign_key: 'creator_id'
  has_many :incoming_invites, class_name: 'Invite', foreign_key: 'attendee_id'
  has_many :invited_events, through: :incoming_invites, class_name: 'Event', foreign_key: 'attendee_id'
  
  serialize :contact, Hash
  
  has_attached_file :avatar,
                  :default_url => '/assets/default-avatar.png',
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/   
  
  has_attached_file :cover,
                  :default_url => '/assets/default-cover.jpg',
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :cover, :content_type => /\Aimage\/.*\Z/   
  
  include PublicActivity::Model
  tracked
  
  def self.business_accts
    User.where(business_id: nil)
  end
  
  def name
    return self.first_name.to_s + ' ' + self.last_name.to_s
  end
  
  def business
    self.businesses.first
  end
  
  def business?
    !self.business.nil?
  end
  
  def poster
    self.business? ? self.business : self
  end
  
  def neighborhood
    self.building.neighborhood
  end
  
  def pending_invitations
    self.incoming_invites.where(accepted: nil)
  end
  
  def attending_events
    self.incoming_invites.where(accepted: true).map{ |invite| invite.event }
  end
  
  def mailboxer_email(object)
    nil
  end
  
  def bool_to_i(bool)
    bool ? 1 : 0
  end
  
  def profile_completion
    inputs = ( bool_to_i(!self.about.to_s.empty?) * 0.3 ) + ( bool_to_i(self.avatar.present?) * 0.1 ) + ( bool_to_i(self.cover.present?) * 0.1 ) + ( bool_to_i(!self.profession.to_s.empty?) * 0.1 )
    complete = 0.3 + inputs
    (complete * 100).to_i
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
  
end
