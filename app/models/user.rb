class User < ActiveRecord::Base
  validates_presence_of :first_name, :last_name
  validates :email, presence: true,
                    format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i },
                    uniqueness: { case_sensitive: false }

  before_create { self.email = email.downcase }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6 }

  before_create :create_name

  def create_name
    self.name = "#{self.first_name} #{self.last_name}"
    self.name.strip!
  end
end
