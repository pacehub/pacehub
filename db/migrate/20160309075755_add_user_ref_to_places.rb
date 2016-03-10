class AddUserRefToPlaces < ActiveRecord::Migration
  def change
    add_reference :places, :user, index: true, foreign_key: true
  end
end
