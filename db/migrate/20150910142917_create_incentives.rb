class CreateIncentives < ActiveRecord::Migration
  def change
    create_table :incentives do |t|
      t.string :incentive
      t.belongs_to :business
      t.boolean :active, default: true
      t.date :expiration
    end
  end
end
