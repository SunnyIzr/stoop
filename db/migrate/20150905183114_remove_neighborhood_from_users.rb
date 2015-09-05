class RemoveNeighborhoodFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :neighborhood_id
  end
end
