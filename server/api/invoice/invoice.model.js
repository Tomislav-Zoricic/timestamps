'use strict'

module.exports = function (sequelize, { INTEGER, STRING, TEXT, DECIMAL, DATE }) {
  const Invoice = sequelize.define('invoice', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    issue_date: {
      type: DATE,
      allowNull: false
    },
    due_date: {
      type: STRING,
      allowNull: true
    },
    subject: {
      type: STRING,
      allowNull: false
    },
    notes: {
      type: TEXT,
      allowNull: true
    },
    amount: {
      type: DECIMAL,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate ({ Customer, TimeEntry }) {
        Invoice.belongsTo(Customer)
        Invoice.hasMany(TimeEntry)
      }
    }
  })

  return Invoice
}
