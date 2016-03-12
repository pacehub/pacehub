class RenameJointTable < ActiveRecord::Migration
  def change
    rename_table :places_users, :users_places
  end
end
