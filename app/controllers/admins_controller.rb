class AdminsController < ApplicationController
  def show
    @admin = Admin.find(params[:id])
  end

  def new
    @admin = Admin.new
  end

  def create
    @admin = Admin.new(admin_params)
    if @admin.save
      log_in @admin
      redirect_to @admin

    else
      render 'new'
    end
  end

  def edit
    @admin = Admin.find(params[:id])
  end

  def update
    @admin = Admin.find(params[:id])
    if @admin.update_attributes(admin_params)
      redirect_to @admin
    else
      render 'edit'
    end
  end

  private

    def admin_params
      params.require(:admin).permit(:adminName, :email, :hby, :password,
                                   :password_confirmation)
    end

    def logged_in_admin
     unless logged_in?
       flash[:danger] = "Please log in."
       redirect_to login_url
     end
    end

    def correct_admin
      @admin = Admin.find(params[:id])
      redirect_to(root_url) unless current_admin?(@admin)
    end
end
