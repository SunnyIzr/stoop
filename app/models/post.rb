class Post < ActiveRecord::Base
  acts_as_commentable
  acts_as_likeable
  acts_as_mentioner
  
  belongs_to :user
  
  has_attached_file :image,
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/                  
  
  include PublicActivity::Model
  tracked
                  
                  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
   
end