'use strict'

import express from 'express'
import sqldb from './sqldb'
import seed from './seed'

import { port } from './../config.json'
const app = express()

require('./express').default(app) // Initialize express.
require('./routes').default(app) // Initialize routes.

function startServer (app) {
  app.listen(port, function () { console.log('running on port ', port) })
}

sqldb.sequelize.sync()
  .then(seed())
  .then(startServer(app))
  .catch(function (err) {
    console.log('Server failed to start due to error: %s', err)
  })
