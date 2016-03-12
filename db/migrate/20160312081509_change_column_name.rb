class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :places, :area, :name
  end
end
