class ChangeLocationOnEvents < ActiveRecord::Migration
  def change
    change_column :events, :location, :text
  end
end
