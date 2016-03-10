class AddDetailsToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :latitude, :float
    add_column :places, :longitude, :float
    add_column :places, :address, :string
  end
end
