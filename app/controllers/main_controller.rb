class MainController < ApplicationController
  def index
    gon.watch.places = current_user.places
  end
end
