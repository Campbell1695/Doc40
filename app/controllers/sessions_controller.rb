class SessionsController < ApplicationController
  def new
  end

  def create
    admin = Admin.find_by(email: params[:session][:email].downcase, hby: params[:session][:hby])
    if admin && admin.authenticate(params[:session][:password])
      log_in admin
      redirect_to admin
      # Log the user in and redirect to the user's show page.
    else
      # Create an error message.
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
end
