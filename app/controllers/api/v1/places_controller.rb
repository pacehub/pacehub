module Api::V1

  class PlacesController < ApiController
    before_action :set_users_place, only: [:show, :delete]

    def index
    end

    def show
    end

    def new
    end

    def create
      @search = Place.find_by(latitude: place_params[:latitude], longitude: place_params[:longitude])
      @place = @search || Place.new(place_params)
      @users_place = UsersPlace.new(user_id: current_user.id, place_id: @place.id) if @place.save
      if @users_place.save
        render json: @place
      else
        render json: @place.errors.messages, :status => HTTP_CODE_BAD_REQUEST
        render html: @place.errors.messages, :status => HTTP_CODE_BAD_REQUEST
      end
    end

    def delete
    end

    private
    # Use callbacks to share common setup or constraints between actions.
    def set_users_place
      @users_place = UsersPlace.find(params[:id])
    end
    # whitelist parameters
    def place_params
      params.require(:place).permit(:latitude, :longitude, :address, :name)
    end
  end
end