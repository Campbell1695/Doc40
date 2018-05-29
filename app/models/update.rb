class Update < ApplicationRecord
  belongs_to :admin

  validates :version, presence: true
end
