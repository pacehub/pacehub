class ChangeLatitudeAndLongitudeTypesInPlaces < ActiveRecord::Migration
  def self.up
    change_column :places, :latitude, :decimal, :precision => 12, :scale => 7
    change_column :places, :longitude, :decimal, :precision => 12, :scale => 7
  end

  def self.down
    change_column :places, :latitude, :float
    change_column :places, :longitude, :float
  end
end
