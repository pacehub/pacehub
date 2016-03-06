class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :email, :string
    add_column :users, :mobile_number, :string
    add_column :users, :surname, :string
    add_column :users, :given_name, :string
    add_column :users, :timezone, :string
    add_column :users, :birthday, :datetime
    add_column :users, :last_sign_in_at, :datetime
    add_column :users, :active, :boolean
  end
end
