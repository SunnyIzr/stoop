class AddNeighborhoodAndBuildingToPosts < ActiveRecord::Migration
  def change
    add_reference :posts, :building, index: true
    add_reference :posts, :neighborhood, index: true
  end
end
