class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit]

  def index
  end

  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to user_path(@user), notice: 'Thank you for signing up!'
    else
      render 'new'
    end
  end

  def edit
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # whitelist parameters
  def user_params
    params.require(:user).permit(:id, :email, :password, :password_confirmation, :name, :first_name, :last_name, :mobile_number,
                                 :active, :timezone, :login_count, :last_login_at, role_ids: [])
  end
end
