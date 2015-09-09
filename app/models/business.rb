class Business < ActiveRecord::Base
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
  has_many :posts, as: :account, dependent: :destroy
  
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
  
  def business?
    true
  end
  
  def mailboxer_email(object)
    nil
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
  
end
