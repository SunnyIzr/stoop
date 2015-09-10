require 'rails_helper'

RSpec.describe Incentive, type: :model do
  it { should have_many (:discount_codes) }
  it { should belong_to (:business) }
end
