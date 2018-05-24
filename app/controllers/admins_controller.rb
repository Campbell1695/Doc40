class AdminsController < ApplicationController
  def show
    @admin = Admin.find(params[:id])
  end

  def new
    @admin = Admin.new
  end

  def create
    @admin = Admin.new(admin_params)    # Not the final implementation!
    if @admin.save
      log_in @admin
      redirect_to @admin
      # Handle a successful save.
    else
      render 'new'
    end
  end

  private

    def admin_params
      params.require(:admin).permit(:adminName, :email, :hby, :password,
                                   :password_confirmation)
    end
end
