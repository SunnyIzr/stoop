class CreateInvitations < ActiveRecord::Migration
  def change
    create_table :invites do |t|
      t.belongs_to :event
      t.integer :attendee_id
      t.boolean :accepted
    end
  end
end
