class ScoresController < ApplicationController
  def index
    @scores = Score.all.sort_by {|s| s.score }.reverse.first(10)
    puts @scores
  end

  def show
      @score = Score.find(params[:id])
    end

  def new
    @score = Score.new
  end

  def create
    @score = Score.new(score_params)

    if @score.save
      redirect_to scores_path
    else
      render redirect_to scores_path
    end
  end

  private
  def score_params
    params.require(:score).permit(:playerName, :score)
  end
end
