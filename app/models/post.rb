class Post < ActiveRecord::Base
  acts_as_commentable
  acts_as_likeable
  acts_as_mentioner
  belongs_to :neighborhood
  belongs_to :building
  
  belongs_to :account, polymorphic: true
  
  has_attached_file :image,
                  :storage => :s3,
                  :s3_credentials => Proc.new{|a| a.instance.s3_credentials }
  
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/                  
  
  include PublicActivity::Model
  tracked
  
  self.per_page = 4
                  
                  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
  
  def data(current_user=nil)
    hash = self.attributes
    hash[:created_at_formatted] = self.created_at.strftime('%m/%d/%y %I:%M%P')
    hash[:image_present] = self.image.present?
    hash[:image] = self.image
    hash[:user] = self.account.attributes
    hash[:user][:name] = self.account.name
    hash[:user][:avatar] = self.account.avatar
    hash[:like_count] = self.likers(User).size
    hash[:current_user_like] =  current_user.nil? ? nil : current_user.likes?(self)
    hash[:likers] = self.likers(User)
    hash[:comment_count] = self.comments.size
    hash[:comments] = self.comments
    hash
  end
   
end