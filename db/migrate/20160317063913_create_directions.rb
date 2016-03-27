class CreateDirections < ActiveRecord::Migration
  def change
    create_table :directions do |t|
      t.references :origin, null: false
      t.references :destination, null: false
      t.decimal :distance
      t.datetime :start_time, null: false
      t.datetime :end_time

      t.timestamps null: false
    end
  end
end
