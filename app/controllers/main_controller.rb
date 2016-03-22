class MainController < ApplicationController
  def index
    gon.watch.my_places = if logged_in?
                            current_user.users_places.
                                        joins(:place).
                                        select('users_places.name as name,
                                                places.address as address,
                                                places.latitude as latitude,
                                                places.longitude as longitude')
                          else
                            []
                          end
  end
end
