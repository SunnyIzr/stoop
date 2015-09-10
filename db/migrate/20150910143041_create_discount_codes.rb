class CreateDiscountCodes < ActiveRecord::Migration
  def change
    create_table :discount_codes do |t|
      t.belongs_to :user
      t.belongs_to :incentive
      t.string :code
      t.boolean :claimed, default: false
    end
  end
end
