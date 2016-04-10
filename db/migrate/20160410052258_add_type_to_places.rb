class AddTypeToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :place_type, :integer, default: 0
  end
end
