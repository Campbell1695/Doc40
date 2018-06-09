Rails.application.routes.draw do

  get '/howToPlay', to: 'welcome#howTo'

  get '/socialhub', to: 'updates#index'

  get '/signup', to: 'admins#new'
  post '/signup',  to: 'admins#create'

  get   '/login',   to: 'sessions#new'
  post  '/login',   to: 'sessions#create'

  delete '/logout',  to: 'sessions#destroy'
  get '/logout',  to: 'sessions#destroy'

  resources :updates
  resources :scores
  resources :admins


  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
