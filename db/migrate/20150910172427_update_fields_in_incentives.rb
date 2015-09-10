class UpdateFieldsInIncentives < ActiveRecord::Migration
  def change
    add_column :incentives, :discount, :integer
    add_column :incentives, :details, :text
    rename_column :incentives, :incentive, :discount_type
    add_attachment :incentives, :image
  end
end
