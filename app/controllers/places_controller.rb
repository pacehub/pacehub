class PlacesController < ApplicationController
  before_action :set_place, only: [:show, :delete]

  def index
    @places = Place.where(user_id: current_user.id)
    gon.places = @places
  end

  def show
  end

  def new
  end

  def create
    @place = Place.new(place_params)
  end

  def delete
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_place
    @place = Place.find(params[:id])
  end
  # whitelist parameters
  def place_params
    params.require(:place).permit(:id, :user_id, :latitude, :longitude)
  end
end
