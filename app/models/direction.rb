class Direction < ActiveRecord::Base

  belongs_to :origin, :class_name => 'Place', :foreign_key => :origin_id
  belongs_to :destination, :class_name => 'Place', :foreign_key => :destination_id

  validates_presence_of :origin_id, :destination_id, :start_time

  def self.get_directions(origin, destination, start_time)
    response = RestClient.get 'https://maps.googleapis.com/maps/api/directions/json',
                              {:params => { :key => 'AIzaSyB-_ZJOQLMJWhZm_e8WHt7Ykcen9KgnJ4c', 
                                            :origin => origin[:latitude].to_s + ',' + origin[:longitude].to_s, 
                                            :destination => destination[:latitude].to_s + ',' + destination[:longitude].to_s }}
    JSON.parse(response)
  end
end
