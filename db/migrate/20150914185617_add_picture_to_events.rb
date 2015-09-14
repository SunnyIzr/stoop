class AddPictureToEvents < ActiveRecord::Migration
  def change
    add_attachment :events, :cover
  end
end
