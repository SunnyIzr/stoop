class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.string :category
      t.belongs_to :user
      t.integer :sender_id
      t.boolean :read, default: false
      t.timestamps
    end
  end
end
