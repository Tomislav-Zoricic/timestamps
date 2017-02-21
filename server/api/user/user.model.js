'use strict'

import crypto from 'crypto'

const DEFAULT_SALT = 'defaultSaltMegazorkan666'
const BYTE_SIZE = 16

const exists = function (value) { return value && value.length }

export default function (sequelize, { STRING, INTEGER }) {
  const User = sequelize.define('user', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: STRING,
      allowNull: false
    },
    first_name: {
      type: STRING,
      allowNull: false
    },
    last_name: {
      type: STRING,
      allowNull: false
    },
    salt: {
      type: STRING,
      allowNull: false,
      defaultValue: DEFAULT_SALT
    }
  }, {
    timestamps: false,
    underscored: true,
    classMethods: {
      associate ({ Task, TimeEntry }) {
        User.hasMany(TimeEntry)
        User.belongsToMany(Task, { through: 'users_tasks', timestamps: false })
      }
    },
    hooks: {
      beforeCreate (user, fields, fn) {
        user.updatePassword(fn)
      },

      beforeUpdate (user, fields, fn) {
        if (user.changed('password')) {
          return user.updatePassword(fn)
        }
        fn()
      }
    },

    instanceMethods: {
      authenticate (password, callback) {
        if (!callback) { return this.password === this.encryptPassword(password) }

        let that = this
        this.encryptPassword(password, function (err, pwdGen) {
          if (err) { callback(err) }

          if (that.password === pwdGen) {
            callback(null, true)
          } else {
            callback(null, false)
          }
        })
      },

      makeSalt (byteSize, callback) {
        return crypto.randomBytes(byteSize, function (err, salt) {
          if (err) { callback(err) }
          return callback(null, salt.toString('base64'))
        })
      },

      encryptPassword (password, callback) {
        if (!password || !this.salt) { return callback ? callback(null) : null }

        const defaultIterations = 10000
        const defaultKeyLength = 64
        let salt = new Buffer(this.salt, 'base64')

        if (!callback) {
          return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
                       .toString('base64')
        }

        return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength,
          function (err, key) {
            if (err) { callback(err) }
            return callback(null, key.toString('base64'))
          })
      },

      updatePassword (fn) {
        // Handle new/update passwords
        if (!this.password) return fn(null)

        if (!exists(this.password)) { fn(new Error('Invalid password')) }

        // Make salt with a callback
        this.makeSalt(BYTE_SIZE, (saltErr, salt) => {
          if (saltErr) {
            return fn(saltErr)
          }
          this.salt = salt
          this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
            if (encryptErr) {
              fn(encryptErr)
            }
            this.password = hashedPassword
            fn(null)
          })
        })
      }
    }
  })

  return User
}
