module Api::V1

  class DirectionsController < ApiController

    def create
      @route = Direction.get_directions(params[:origin], params[:destination], Time.now)
      if @route['status'] == 'OK'
        duration = @route['routes'][0]['legs'][0]['duration']['value']
        distance = @route['routes'][0]['legs'][0]['distance']['value']
        origin = Place.exist(params[:origin])
        destination = Place.exist(params[:destination])
        @direction = Direction.new(origin: origin, destination: destination, start_time: Time.now,
                                      end_time: Time.now + duration.seconds, distance: distance)
        (render json: @direction, :status => HTTP_CODE_CREATED) if @direction.save
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