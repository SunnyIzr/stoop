class AddLocationToPostsAndEvents < ActiveRecord::Migration
  def change
    add_column :events, :location, :string
    add_column :posts, :location, :string
  end
end
