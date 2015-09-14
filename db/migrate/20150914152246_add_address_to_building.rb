class AddAddressToBuilding < ActiveRecord::Migration
  def change
    add_column :buildings, :address, :string
  end
end
