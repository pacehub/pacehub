class AddDetailsToUsersPlaces < ActiveRecord::Migration
  def change
    add_column :users_places, :name, :string
  end
end
