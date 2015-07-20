require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:incoming_invites) }
  it { should have_many(:events) }
  it { should have_many(:invited_events) }
  it { should have_attached_file(:avatar) }
  it { should validate_attachment_content_type(:avatar).
                allowing('image/png', 'image/gif').
                rejecting('text/plain', 'text/xml') }
  it { should have_attached_file(:cover) }
  it { should validate_attachment_content_type(:cover).
                allowing('image/png', 'image/gif').
                rejecting('text/plain', 'text/xml') }
end
