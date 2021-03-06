class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:google_oauth2, :facebook]
  
  acts_as_liker
  acts_as_mentionable
  acts_as_follower
  acts_as_followable
  acts_as_messageable
  
  has_many :notifications
  
  has_many :businesses, dependent: :destroy
  accepts_nested_attributes_for :businesses
  has_many :discount_codes
  
  belongs_to :building
  has_many :posts, as: :account, dependent: :destroy
  
  has_many :events, class_name: 'Event', foreign_key: 'creator_id'
  has_many :incoming_invites, class_name: 'Invite', foreign_key: 'attendee_id'
  has_many :invited_events, through: :incoming_invites, class_name: 'Event', foreign_key: 'attendee_id'
  
  serialize :contact, Hash
  serialize :interests, Array
  
  has_attached_file :avatar,
                  :default_url => 'default-avatar.png',
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/   
  
  has_attached_file :cover,
                  :default_url => 'default-cover.jpg',
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
    self.business? ? self.business.neighborhood : self.building.neighborhood
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
  
  def last_conversation(counterparty)
    self.mailbox.conversations.select{ |convo| convo.participants.include?(counterparty )}.last
  end
  
  def missing_profile_elements
    missing = []
    missing << 'about' if self.about.to_s.empty?
    missing << 'avatar' if !self.avatar.present?
    missing << 'cover' if !self.cover.present?
    missing << 'interests' if self.interests.empty?
    missing << 'profession' if self.profession.to_s.empty?
    missing
  end
  
  def profile_completion
    inputs = ( bool_to_i(!self.about.to_s.empty?) * 30 ) + ( bool_to_i(self.avatar.present?) * 10 ) + ( bool_to_i(self.cover.present?) * 10 ) + ( bool_to_i(!self.interests.empty?) * 10 ) + ( bool_to_i(!self.profession.to_s.empty?) * 10 )
    complete = 30 + inputs
    complete
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
  
  def self.get_img_url(url)
    url = URI.parse(url + '?width=450')
    res = Net::HTTP.start(url.host, url.port) {|http|
      http.get( url.request_uri)
    }
    res['location']
  end
  
  def non_chat_notifications
    Notification.where("user_id = ? AND category != ?", self.id , 'chat')
  end
  
  def unread_notifications
    Notification.where("user_id = ? AND category != ? AND read = ?", self.id , 'chat', false)
  end
  
  def unread_chat_notifications
    Notification.where("user_id = ? AND category = ? AND read = ?", self.id , 'chat', false)
  end
  
  def self.from_fb_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.gender = auth.info.gender
      user.avatar = get_img_url(auth.info.image)
      user.password = Devise.friendly_token[0,20]
    end
  end
  def self.from_google_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.first_name = auth.info.first_name
      user.last_name = auth.info.last_name
      user.avatar = auth.info.image
      user.password = Devise.friendly_token[0,20]
    end
  end
end
