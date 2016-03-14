class UsersPlacesController < ApplicationController
  before_action :set_users_place, only: [:update, :destroy]
  respond_to :html, :xml, :json

  def index
    @users_places = current_user.users_places.order(:id).
                                              joins(:place).
                                              select('places.address as address,
                                                      users_places.id as id,
                                                      users_places.name as name')
  end

  def destroy
    @users_place.delete
    flash[:success] = 'Successfully removed place'
    redirect_to users_places_path
  end

  def update
    @users_place.update_attributes(users_place_params)
    respond_with @users_place
  end

  private
  def set_users_place
    @users_place = UsersPlace.find(params[:id])
  end
  def users_place_params
    params.require(:users_place).permit(:name, :id)
  end
end