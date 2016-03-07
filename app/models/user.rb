class User < ActiveRecord::Base
  validates_presence_of :first_name, :last_name, :email
  before_create :create_name

  def create_name
    self.name = "#{self.first_name} #{self.last_name}"
    self.name.strip!
  end
end
