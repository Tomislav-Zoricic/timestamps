import Sequelize from 'sequelize'
import { db } from './../../config.json'

const database = {
  Sequelize,
  sequelize: new Sequelize(db.name, db.username, db.password)
}

database.User = database.sequelize.import('./../api/user/user.model')
database.Task = database.sequelize.import('./../api/task/task.model')
database.Project = database.sequelize.import('./../api/project/project.model')
database.Invoice = database.sequelize.import('./../api/invoice/invoice.model')
database.Customer = database.sequelize.import('./../api/customer/customer.model')
database.TimeEntry = database.sequelize.import('./../api/time-entry/time-entry.model')

Object.keys(database).forEach(function (modelName) {
  if ('associate' in database[modelName]) database[modelName].associate(database)
})

module.exports = database
