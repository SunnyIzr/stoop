class AddProfileFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :gender, :string
    add_column :users, :after_five_pm, :text
    add_column :users, :date_of_birth, :date
    add_column :users, :profession, :string
    add_column :users, :about, :text
    add_column :users, :contact, :text
    add_attachment :users, :avatar
    add_attachment :users, :cover
  end
end
