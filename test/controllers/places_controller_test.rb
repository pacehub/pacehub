require 'test_helper'

class PlacesControllerTest < ActionController::TestCase
  test "should get user:reference" do
    get :user:reference
    assert_response :success
  end

end
