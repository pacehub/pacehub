class Place < ActiveRecord::Base
  belongs_to :user
  def initialize
    @place = Place.new(user_id: @user.id)
  end
end
