class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name
      t.belongs_to :neighborhood
      t.text :contact
      t.belongs_to :user
      t.date :established
      t.string :industry
      t.attachment :users, :avatar
      t.attachment :users, :cover
    end
  end
end
