class UpdatesController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
      @updates = Update.all
  end

  def new
    @update = Update.new
  end

  def create
    @update = Update.new(update_params)
    if @update.save
      redirect_to @update
    else
      redirect_to '/socialhub'
    end
  end

  def show
    @update = Update.find(params[:id])
  end

  def edit
    @admin = current_admin
    @update = Update.find(params[:id])
  end

  def update
    @update = Update.find(params[:id])
    @update.update(edit_params)
    @update.save

    redirect_to @update
  end

  def destroy
    @update = Update.find(params[:id])
    @update.destroy

    redirect_to updates_path
  end

  private
    def update_params
      params.require(:create).permit(:version, :description)
    end

    def edit_params
      params.require(:update).permit(:version, :description)
    end

end
