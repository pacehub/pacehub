class PlacesController < ApplicationController
  before_action :set_place, only: [:show, :destroy]

  def index
    @places = Place.where(user_id: current_user.id)
  end

  def show
  end

  def new
  end

  def create
    @place = Place.new(place_params)
  end

  def destroy
    @place.destroy
    flash[:success] = 'Successfully removed place'
    redirect_to places_path
  end

  private
  # Use callbacks to share common setup or constraints between actions
  def set_place
    @place = Place.find(params[:id])
  end
  # whitelist parameters
  def place_params
    params.require(:place).permit(:id, :user_id, :latitude, :longitude, :address, :name)
  end
end
