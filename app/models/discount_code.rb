class DiscountCode < ActiveRecord::Base
  belongs_to :incentive
  belongs_to :user
  validates_uniqueness_of :code
  
  def self.generate(user,incentive)
    code = (0..7).map{ rand(36).to_s(36).capitalize }.join
    DiscountCode.create(user: user, incentive: incentive, code: code )
  end
  
end