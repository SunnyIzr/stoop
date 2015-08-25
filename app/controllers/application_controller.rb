class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: ENV['LOGIN'], password: ENV['PW']
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  layout :choose_layout
  
  def choose_layout
    current_user.nil? ? 'public_facing' : 'application'
  end
  
end
