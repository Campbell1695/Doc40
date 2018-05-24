class Score < ApplicationRecord
  validates :playerName, presence: true,
                    length: { minimum: 3 }
end
