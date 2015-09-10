class Incentive < ActiveRecord::Base
  has_many :discount_codes
  belongs_to :business
end