class AddAreaToPlaces < ActiveRecord::Migration
  def change
    add_column :places, :area, :string
  end
end
