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
      @search = Place.exist(place_params)
      @place = @search || Place.new(place_params)

      if @place.save
        dup = UsersPlace.where(user: current_user, place: @place)

        if dup.blank?
          @users_place = UsersPlace.new(user_id: current_user.id, place_id: @place.id, name: @place.name)
          render json: @place, :status => HTTP_CODE_CREATED if @users_place.save
        else
          render json: { "error" => "Duplicate record", "record" => dup }, :status => HTTP_CODE_CONFLICT
        end
      else
        render json: @place.errors.messages, :status => HTTP_CODE_BAD_REQUEST
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