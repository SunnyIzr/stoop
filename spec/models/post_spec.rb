require 'rails_helper'

RSpec.describe Post, type: :model do
  it { should belong_to(:account) }
  it { should have_many(:comments) }
  it { should have_attached_file(:image) }
  it { should validate_attachment_content_type(:image).
                allowing('image/png', 'image/gif').
                rejecting('text/plain', 'text/xml') }
end
