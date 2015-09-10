class DiscountCode < ActiveRecord::Base
  belongs_to :incentive
  belongs_to :user
end