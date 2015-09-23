class ChangeLocationOnPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :location
    add_column :posts, :lat, :string
    add_column :posts, :lng, :string
  end
end
