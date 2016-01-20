class AddYelpToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :yelp_id, :string
  end
end
