class BusinessesController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    @business = Business.find(params[:id])
    @posts = @business.posts.paginate(page: params[:page], per_page: 5).order('created_at DESC')
    if @business.user == current_user
      @editable = true
    else
      @editable = false
    end
  end
  
  def update
    @business = Business.find(params[:id])
    if @business.user == current_user
      if @user.update!(user_params)
        respond_to do |format|
          format.json{ render json: @business }
          format.html{ redirect_to @business }
        end
      else
        respond_to do |format|
          format.json{ render nothing: true }
          format.html{ redirect_to root_path }
        end
      end
    end
  end
  
  private
  def business_params
    params.require(:business).permit(:name,:neighborhood_id,:contact,:established,:industry,:about,:avatar,:cover)
  end
end