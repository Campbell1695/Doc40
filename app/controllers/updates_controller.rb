class UpdatesController < ApplicationController
skip_before_action :verify_authenticity_token

  def index
      @update = Update.all
  end

  def create
    @update = Update.new(update_params)

    if @update.save
    redirect_to "/socialhub"
  else
    render "/socialhub"
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

  if @update.update(update_params)
    redirect_to @update
  else
    render 'edit'
  end
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

end
