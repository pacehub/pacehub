module Api::V1

  class PlacesController < ApiController
    before_action :set_place, only: [:show, :delete]

    def index
      @places = Place.where(user_id: current_user.id)
    end

    def show
    end

    def new
    end

    def create
      @place = current_user.places.create(place_params)
      if @place.save
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
    def set_place
      @place = Place.find(params[:id])
    end
    # whitelist parameters
    def place_params
      params.require(:place).permit(:id, :user_id, :latitude, :longitude, :address)
    end
  end
end