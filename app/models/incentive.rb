class Incentive < ActiveRecord::Base
  has_many :discount_codes
  has_many :users, through: :discount_codes
  belongs_to :business
  
  before_save :check_active_on_siblings
  
  has_attached_file :image,
                :default_url => 'default-cover.jpg',
                :storage => :s3,
                :s3_credentials => Proc.new{|a| a.instance.s3_credentials }

  def self.types
    [:cash, :percent]
  end
  
  def copy
    self.discount_type == 'percent' ? "#{self.discount}% off" : "$#{self.discount} off"
  end
  
  def check_active_on_siblings
    if self.active
      active_sibling = self.business.active_incentive
      active_sibling.update!(active: false) unless active_sibling.nil?
    end
  end
  
  def discount_code(user)
    self.discount_codes.where(user: user)[0]
  end
  
  def expired?
    self.expiration < Time.new
  end
  
  def status
    if self.expired?
      'Expired'
    else
      self.active ? 'Active' : 'Inactive'
    end
  end
  
  def s3_credentials
    {:bucket => ENV['BUCKET'], :access_key_id => ENV['ACCESS_KEY_ID'], :secret_access_key => ENV['SECRET_ACCESS_KEY']}
  end
end
