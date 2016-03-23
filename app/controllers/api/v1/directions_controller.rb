module Api::V1

  class DirectionsController < ApiController

    def create
      @direction = Direction.get_directions(params[:origin], params[:destination], Time.now)
      if @direction['code'] == 'OK'
        @direction.save
        render json: @direction['routes'][0], :status => HTTP_CODE_CREATED
      else
        render json: @direction, :status => @direction['status']
      end
    end

    # private
    # # whitelist parameters
    # def direction_params
    #   params.permit(:origin, :destination)
    # end
  end
end