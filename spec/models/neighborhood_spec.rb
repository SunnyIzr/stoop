require 'rails_helper'

RSpec.describe Neighborhood, type: :model do
  it { should have_many(:buildings) }
  it { should have_many(:users) }
end
