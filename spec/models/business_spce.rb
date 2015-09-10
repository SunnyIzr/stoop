require 'rails_helper'

RSpec.describe Business, type: :model do
  it { should have_many (:incentives) }
  it { should belong_to (:user) }
  it { should belong_to (:neighborhood) }
end
