class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: ENV['LOGIN'], password: ENV['PW']
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  layout :choose_layout
  
  
  def choose_layout
    current_user.nil? ? 'public_facing' : 'application'
  end
  
  rescue_from ActiveRecord::RecordNotFound do
    flash[:warning] = 'Resource not found.'
    redirect_back_or root_path
  end

  def redirect_back_or(path)
    redirect_to request.referer || path
  end
  
  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:first_name, :last_name, :email, :password, :password_confirmation, :building_id) }
  end
  
end
