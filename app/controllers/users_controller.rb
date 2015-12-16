class UsersController < ApplicationController
  before_filter :authenticate_user!
  autocomplete :user, :first_name, full: true, extra_data: [:id, :first_name, :last_name,:avatar_file_name,:avatar_content_type], display_value: :avatar
  
  def feed
    if current_user.admin
      @users = User.where(verified: false).sort
      render 'admin/unverified_users'
    else
      @posts = Post.where(neighborhood_id: current_user.neighborhood.id).paginate(page: params[:page], per_page: 5).order('created_at DESC')  
    end
  end
  
  def filtered_feed
    if params[:filter] == 'building'
      @posts = Post.where(building_id: current_user.building.id).paginate(page: params[:page], per_page: 5).order('created_at DESC')
    elsif params[:filter] == 'neighborhood'
      @posts = Post.where(neighborhood_id: current_user.neighborhood.id).paginate(page: params[:page], per_page: 5).order('created_at DESC')  
    end
    @filter = params[:filter]
    respond_to do |format|
      format.html { render 'feed' }
      format.js { render 'building_feed' }
    end
  end
  
  def show
    @user = User.find(params[:id])
    @posts = @user.posts.paginate(page: params[:page], per_page: 5).order('created_at DESC')
    @coords = @user.building.coords
    if @user == current_user
      @missing_profile_elements = @user.missing_profile_elements
      @editable = true
    else
      @editable = false
    end
  end
  
  def update
    @user = User.find(params[:id])
    if @user == current_user
      if @user.update!(user_params)
        respond_to do |format|
          format.json{ render json: @user }
          format.html{ redirect_to @user }
        end
      else
        respond_to do |format|
          format.json{ render nothing: true }
          format.html{ redirect_to root_path }
        end
      end
    end
  end
  
  def verify
    if current_user.admin
      @user = User.find(params[:id])
      @user.update!(verified: true)
      redirect_to root_path
    end
  end
  
  def index
    if current_user.admin
      @users = User.all.sort
      render 'admin/users'
    end
  end
  
  def search
    term = params[:term].downcase
    render json: User.where('lower(first_name) LIKE ? OR lower(last_name) LIKE ?', "%#{ term }%", "%#{ term }%").map{ |user| {id: user.id, name: user.name, avatar: user.avatar} }
  end
  
      
  def get_convo
    @user = current_user
    @cpty = User.find(params['cpty_id'])
    @conversation = @user.last_conversation(@cpty)
    respond_to do |format|
      format.js { render json: {conversation: @conversation, cpty: @cpty, avatar: @cpty.avatar } }
    end
  end
  
  private
  def user_params
    params.require(:user).permit(:email,:building_id,:neighborhood_id,:first_name,:last_name,:gender,:after_five_pm,:date_of_birth,:profession,:about,:contact,:avatar,:cover,interests: [])
  end
end