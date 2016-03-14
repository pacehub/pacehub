class AddPrimaryKeyToUsersPlaces < ActiveRecord::Migration
  def change
    add_column :users_places, :id, :primary_key
  end
end
