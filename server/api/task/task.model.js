'use strict'

// Task name must be between 5 and 20 characters long.
// NOTE put in config.json?
const MIN_CHARS = 5
const MAX_CHARS = 20

module.exports = function (sequelize, { INTEGER, STRING, DECIMAL }) {
  const Task = sequelize.define('task',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING,
        allowNull: false,
        validate: {
          len: [MIN_CHARS, MAX_CHARS]
        }
      },
      description: {
        type: STRING
      },
      rate: {
        type: DECIMAL,
        allowNull: false
      }
    }, {
      timestamps: false,
      underscored: true,
      classMethods: {
        associate ({ Project, User, TimeEntry }) {
          Task.hasMany(TimeEntry)
          Task.belongsTo(Project)
          Task.belongsToMany(User, { through: 'users_tasks', timestamps: false })
        }
      }
    })

  return Task
}
