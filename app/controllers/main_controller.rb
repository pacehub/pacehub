class MainController < ApplicationController
  def index
    gon.watch.my_places = (logged_in? ? current_user.places : [])
  end
end
