class AddAccountToPosts < ActiveRecord::Migration
  def change
    rename_column :posts, :user_id, :account_id
    add_column :posts, :account_type, :string
  end
end
