class AddAcctTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :business_acct, :boolean, default: false
  end
end
