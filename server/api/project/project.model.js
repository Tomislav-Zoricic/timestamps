'use strict'

// Project name must be between 5 and 20 characters long.
const MIN_CHARS = 5
const MAX_CHARS = 20

module.exports = function (sequelize, { INTEGER, STRING, TEXT, DECIMAL }) {
  const Project = sequelize.define('project',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [MIN_CHARS, MAX_CHARS]
        }
      },
      description: {
        type: TEXT
      },
      budget: {
        type: DECIMAL,
        allowNull: false
      }
    }, {
      timestamps: false,
      underscored: true,
      classMethods: {
        associate ({ Task, TimeEntry, Customer }) {
          Project.hasMany(Task)
          Project.hasMany(TimeEntry)
          Project.belongsTo(Customer, { foreignKey: { allowNull: true } })
        }
      }
    })

  return Project
}
