class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :login_count, :integer
    add_column :users, :last_login_at, :datetime
    add_column :users, :active, :boolean
  end
end
