'use strict'

module.exports = function (sequelize, { INTEGER, STRING }) {
  const Customer = sequelize.define('customer', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,

      validate: {
        isEmail: true
      }
    },
    company: {
      type: STRING,
      allowNull: true
    },
    first_name: {
      type: STRING,
      allowNull: false
    },
    last_name: {
      type: STRING,
      allowNull: false
    },
    address: {
      type: STRING,
      allowNull: false
    },
    postal_code: {
      type: STRING,
      allowNull: false
    },
    city: {
      type: STRING,
      allowNull: false
    },
    state: {
      type: STRING,
      allowNull: true
    },
    country: {
      type: STRING,
      allowNull: false
    },
    phone_number: {
      type: STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate ({ Invoice, Project }) {
        Customer.hasMany(Invoice)
        Customer.hasMany(Project)
      }
    }
  })

  return Customer
}
