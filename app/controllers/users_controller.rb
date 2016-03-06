class UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])
  end

  # whitelist parameters
  def user_params
    params.require(:user).permit(:id, :email, :password, :name, :slug, :surname, :given_name, :image_url, :mobile_number, 
      :gender, :birthday, :active, :default_brand_id, :default_zone_id, :default_postal_code, :current_cart_token, :timezone, role_ids: [])
  end
end
