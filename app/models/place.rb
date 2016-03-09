class Place < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :latitude, :longitude, :address
end
