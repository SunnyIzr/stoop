class AddAboutToEvents < ActiveRecord::Migration
  def change
    add_column :events, :about, :text
  end
end
