module Api::V1

  class ApiController < ::ApplicationController
    # http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    RETURN_CODES = [
      HTTP_CODE_OK = 200,
      HTTP_CODE_CREATED = 201,
      HTTP_CODE_ACCEPTED = 202,
      HTTP_CODE_NO_CONTENT = 204,
      HTTP_CODE_RESET_CONTENT = 205,

      HTTP_CODE_BAD_REQUEST = 400,
      HTTP_CODE_UNAUTHORIZED = 401,
      HTTP_CODE_FORBIDDEN = 403,
      HTTP_CODE_NOT_FOUND = 404,
      HTTP_CODE_CONFLICT = 409,
      HTTP_CODE_GONE = 410,

      HTTP_CODE_INTERNAL_SERVER_ERROR = 500,
      HTTP_CODE_NOT_IMPLEMENTED = 501,

      APPLICATION_CODE_OK =  10000,
      APPLICATION_CODE_POSTAL_CODE_NOT_SERVICED =  10001
    ]
  end
end