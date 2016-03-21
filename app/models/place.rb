class Place < ActiveRecord::Base
  has_many :users_places
  has_many :users, -> { uniq }, :through => :users_places

  has_many :origins, :class_name => 'Direction', :foreign_key => 'origin_id'
  has_many :destinations, :class_name => 'Direction', :foreign_key => 'destination_id'

  validates_presence_of :latitude, :longitude, :address, :name
end
