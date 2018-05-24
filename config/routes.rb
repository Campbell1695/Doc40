Rails.application.routes.draw do

  root 'welcome#index'

  get '/howToPlay', to: 'welcome#howTo'

  get '/signup', to: 'admins#new'
  post '/signup',  to: 'admins#create'
  get   '/login',   to: 'sessions#new'
  post  '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'

  resources :scores
  resources :admins
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
