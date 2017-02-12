'use strict'

import express from 'express'
import sqldb from './sqldb'
import seed from './seed/hardcode-data.js'

import { port } from './../config.json'
const app = express()

require('./express').default(app) // Initialize express.
require('./routes').default(app) // Initialize routes.

function startServer (app) {
  app.listen(port, function () { console.log(`running on port: ${port}`) })
}

sqldb.sequelize.sync()
  .then(startServer(app))
  .then(seed())
  .catch(function (err) {
    console.log(`Server failed to start due to error: ${err}`)
  })
