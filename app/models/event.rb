class Event < ActiveRecord::Base
  has_many :invites
  has_many :attendees, through: :invites
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  acts_as_commentable
  serialize :location, Hash
  
    has_attached_file :cover,
                  :default_url => '/assets/default-cover.jpg',
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :cover, :content_type => /\Aimage\/.*\Z/   
  
  include PublicActivity::Model
  tracked 
  
  def date
    self.start_time.strftime('%b %d')
  end
  
  def time
    self.start_time.strftime('%l:%M %p')
  end
  
  def confirmed_guests
  end
  
  def declined_guests
  end
  
  def unconfirmed_guests
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
end