require 'rails_helper'

RSpec.describe Event, type: :model do
  it { should have_many(:invites) }
  it { should have_many(:attendees) }
  it { should belong_to(:creator) }
end
