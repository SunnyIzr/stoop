require 'rails_helper'

RSpec.describe Building, type: :model do
  it { should have_many (:users) }
  it { should belong_to (:neighborhood) }
end
