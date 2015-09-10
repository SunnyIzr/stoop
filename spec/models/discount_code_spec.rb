require 'rails_helper'

RSpec.describe DiscountCode, type: :model do
  it { should belong_to (:incentive) }
  it { should belong_to (:user) }
end
