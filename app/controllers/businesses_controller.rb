class BusinessesController < ApplicationController
  before_filter :authenticate_user!

  def show
    @business = Business.find(params[:id])
    @posts = @business.posts.paginate(page: params[:page], per_page: 5).order('created_at DESC')
    @coords = @business.coords
    if @business.user == current_user
      @editable = true
    else
      @editable = false
    end
  end

  def show_unverified
    @business = Yelp.client.business(params[:id])
  end

  def update
    @business = Business.find(params[:id])
    if @business.user == current_user
      if @business.update!(business_params)
        if !business_params[:yelp_id].nil?
          p '*'*1000
          p 'RUNNING YELP PERSIST'
          @business.persist_yelp_data
        end
        respond_to do |format|
          format.json{ render json: @business }
          format.html do
            flash[:business_assigned] = "Your business info has successfully been submitted"
            redirect_to @business
          end
        end
      else
        respond_to do |format|
          format.json{ render nothing: true }
          format.html{ redirect_to root_path }
        end
      end
    end
  end

  def index
    @businesses = Business.all
  end

  def search
    term = params[:term].downcase
    render json: Business.where('lower(name) LIKE ? OR lower(industry) LIKE ?', "%#{ term }%", "%#{ term }%").map{ |business| {id: business.id, name: business.name, avatar: business.avatar} }
  end

  private
  def business_params
    params.require(:business).permit(:name,:neighborhood_id,:contact,:established,:industry,:about,:avatar,:cover,:yelp_id)
  end
end