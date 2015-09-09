class UpdateFieldsOnUsers < ActiveRecord::Migration
  def change
    # remove_column :users, :business_acct
    add_reference :users, :business, index: true
  end
end
