class CreateUpdates < ActiveRecord::Migration[5.2]
  def change
    create_table :updates do |t|
      t.integer :version
      t.text :description
      t.references :admin, foreign_key: true

      t.timestamps
    end
  end
end
