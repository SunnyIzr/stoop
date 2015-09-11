class DiscountCodesController < ApplicationController
  def create
    incentive = Business.find(params[:business_id]).active_incentive
    @discount_code = DiscountCode.generate(current_user,incentive)
    if @discount_code
      respond_to do |format|
        format.json { render json: @discount_code}
        format.html { redirect_to business_path(incentive.business) }
      end
    else
      respond_to do |format|
        format.json { render nothing: true }
        format.html { redirect_to business_path(incentive.business) }
      end
    end
  end

  def show
  end

  def update
    @discount_code = DiscountCode.find(params[:id])
    if @discount_code.update!(discount_code_params)
      respond_to do |format|
        format.json{ render json: @discount_code }
        format.html{ redirect_to @discount_code.incentive }
      end
    else
      respond_to do |format|
        format.json{ render nothing: true }
        format.html{ redirect_to root_path }
      end
    end
  end
  
  def index
    @discount_codes = current_user.discount_codes
  end
  
  private
  def discount_code_params
    params.require(:discount_code).permit(:claimed)
  end
  
end