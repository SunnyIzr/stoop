Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "users/registrations" }

  authenticated :user do
    root to: 'users#feed', as: :authenticated_root
  end
  
  #Static Pages Routes
  root to: 'static_pages#index'
  get '/financial-district' => 'static_pages#financial_district'
  
  
  #User Routes
  resources :users, only: [:show, :update] do
    get :autocomplete_user_first_name, on: :collection
  end  
  
  #Business Routes
  resources :businesses, only: [:show, :update]  
  
  #Events Routes
  get '/events' => 'events#index', as: :events
  resources :events, only: [:create, :show]
  
  #Mailboxer Routes
  resources :messages, only: [:new, :create]
  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :restore
      post :reply
      post :mark_as_read
    end
    collection do
      delete :empty_trash
    end
  end
  
  #Post Routes
  resources :posts, only: [:create,:show]
  
  #Comment Routes
  resources :comments, only: [:create]
  
  #Like Routes
  resources :likes, only: [:create]
  
  #Follow Routes
  resources :follows, only: [:create]
  
  #Incentive and DiscountCode Routes
  resources :incentives, only: [:index,:show,:create,:update]
  resources :discount_codes, only: [:index,:show,:create,:update]
  
  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
