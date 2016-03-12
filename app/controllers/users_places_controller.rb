class UsersPlacesController < ApplicationController

  def index
    @users_places = current_user.places
  end

  def destroy
    current_user.places.delete(Place.find(params[:id]))
    flash[:success] = 'Successfully removed place'
    redirect_to users_places_path
  end
end