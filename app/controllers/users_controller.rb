class UsersController < ApplicationController

  def index
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

  end

  def edit
  end

  private
  # whitelist parameters
  def user_params
    params.require(:user).permit(:id, :email, :password, :name, :first_name, :last_name, :image_url, :mobile_number,
                                 :active, :timezone, :login_count, :last_login_at, role_ids: [])
  end
end
