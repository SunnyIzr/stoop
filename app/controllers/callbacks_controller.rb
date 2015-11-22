class CallbacksController < Devise::OmniauthCallbacksController

  def facebook
    omniauth_user = User.from_omniauth(request.env["omniauth.auth"])
    if omniauth_user.id.nil?
      @user = retrieve_and_update_existing_user_by_email(omniauth_user)
    else
      @user = omniauth_user
      #TODO- Morgan: need to request building before this moment
      @user.update(building_id: 1)
    end
    sign_in_and_redirect @user
  end

  def google_oauth2
    omniauth_user = User.from_omniauth(request.env["omniauth.auth"])
    if omniauth_user.id.nil?
      @user = retrieve_and_update_existing_user_by_email(omniauth_user)
    else
      @user = omniauth_user
      #TODO- Morgan: need to request building before this moment
      @user.update(building_id: 1)
    end
    sign_in_and_redirect @user
  end

  private

  def retrieve_and_update_existing_user_by_email(omniauth_user)
    user = User.find_by(email: omniauth_user.email)
    if user.nil? 
      return nil
    else
      #TODO- Morgan: building id hard coded
      user.update(provider: omniauth_user.provider, uid: omniauth_user.uid, building_id: 1)
      return user
    end
  end

end
