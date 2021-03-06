class IncentivesController < ApplicationController
  def create
    updated_params = incentive_params
    updated_params[:business_id] = current_user.business.id
    incentive = Incentive.new(updated_params)
    incentive.business = current_user.business
    if incentive.save
      respond_to do |format|
        format.html { redirect_to incentive }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
        format.html { redirect_to root_path }
      end
    end
  end

  def show
    @incentive = Incentive.find(params[:id])
  end

  def index
    @incentives = current_user.business.incentives.sort.reverse
  end
  
  def update
    @incentive = Incentive.find(params[:id])
    if @incentive.update!(incentive_params)
      respond_to do |format|
        format.json{ render json: @incentive }
        format.html{ redirect_to @incentive }
      end
    else
      respond_to do |format|
        format.json{ render nothing: true }
        format.html{ redirect_to root_path }
      end
    end
  end
  
  private
  def incentive_params
    params.require(:incentive).permit(:discount_type,:discount,:expiration,:details,:active)
  end
end
