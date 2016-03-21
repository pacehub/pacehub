module Api::V1

  class DirectionsController < ApiController

    def create
      @direction = Direction.get_directions(params[:origin], params[:destination], Time.now)
      if @direction.code == '200'
        @direction.save
        render json: @direction, :status => HTTP_CODE_CREATED
      else
        render json: @direction, :status => @direction.code
      end
    end

    private
    # whitelist parameters
    def place_params
      params.require(:directions).permit(:origin, :destination)
    end
  end
end