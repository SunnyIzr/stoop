class AddAboutToBusinesses < ActiveRecord::Migration
  def change
    add_column :businesses, :about, :text
  end
end
