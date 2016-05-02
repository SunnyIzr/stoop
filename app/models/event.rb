class Event < ActiveRecord::Base
  has_many :invites
  has_many :attendees, through: :invites
  belongs_to :creator, class_name: 'User', foreign_key: 'creator_id'
  belongs_to :event
  acts_as_commentable
  serialize :location, Hash
  
    has_attached_file :cover,
                  :default_url => 'default-cover.jpg',
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :cover, :content_type => /\Aimage\/.*\Z/   
  
  include PublicActivity::Model
  tracked 
  
  def date
    self.start_time.strftime('%B %d, %Y')
  end
  
  def time
    self.start_time.strftime('%l:%M %p')
  end
  
  def confirmed_guests
    self.invites.where(accepted: true).map{ |i| i.attendee }
  end
  
  def declined_guests
  end
  
  def unconfirmed_guests
  end
  
  def coords
    Geocoder.coordinates(self.location['street'] + ', ' + self.location['city'] +', ' + self.location['state'] + ', US')
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
end
