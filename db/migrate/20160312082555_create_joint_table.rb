class CreateJointTable < ActiveRecord::Migration
  def down
    remove_column :places, :user_id
  end

  def up
    create_join_table :users, :places do |t|
      t.index :user_id
      t.index :place_id
    end
  end
end
