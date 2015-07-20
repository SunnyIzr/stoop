class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :event_type
      t.datetime :start_time
      t.timestamps
    end
  end
end
