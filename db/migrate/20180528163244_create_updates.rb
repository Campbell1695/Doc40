class CreateUpdates < ActiveRecord::Migration[5.2]
  def change
    create_table :updates do |t|
      t.integer :version
      t.text :description

      t.timestamps
    end
  end
end
