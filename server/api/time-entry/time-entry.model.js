'use strict'

export default function (sequelize, { DATE, DECIMAL, INTEGER }) {
  const TimeEntry = sequelize.define('time_entry', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DATE,
      allowNull: false
    },
    amount: {
      type: DECIMAL,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate ({ Task, User, Project, Invoice }) {
        TimeEntry.belongsTo(User)
        TimeEntry.belongsTo(Project)
        TimeEntry.belongsTo(Task)
        TimeEntry.belongsTo(Invoice, { foreignKey: { allowNull: true } })
      }
    }
  })

  return TimeEntry
}
