class UsersController < ApplicationController
  before_filter :authenticate_user!
  
  def feed
  end
  
  def show
    @user = User.find(params[:id])
    if @user == current_user
      render 'edit'
    else
      render 'show'
    end
  end
  
  def update
    user = User.find(params[:id])
    if user == current_user
      user.update!(user_params)
      redirect_to user
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:email,:building_id,:neighborhood_id,:first_name,:last_name,:gender,:after_five_pm,:date_of_birth,:profession,:about,:contact,:avatar)
  end
end