class MainController < ApplicationController
  def index
    gon.watch.places = (logged_in? ? current_user.places : [])
  end
end
