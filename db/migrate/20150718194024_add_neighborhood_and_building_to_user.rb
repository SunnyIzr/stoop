class AddNeighborhoodAndBuildingToUser < ActiveRecord::Migration
  def change
    add_reference :users, :building, index: true
    add_reference :users, :neighborhood, index: true
  end
end
