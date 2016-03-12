class Place < ActiveRecord::Base
  has_many :users_places
  has_many :users, :through => :users_places

  validates_presence_of :latitude, :longitude, :address, :name
end
