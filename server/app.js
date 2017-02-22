'use strict'

import express from 'express'
import sqldb from './sqldb'
import seed from './seed/hardcode-data.js'

import { port } from './../config.json'
const app = express()

import initExpress from './express'
import initRoutes from './routes'

initExpress(app)
initRoutes(app)

function startServer (app) {
  app.listen(port, () => console.log(`running on port: ${port}`))
}

const shouldSeed = true

sqldb.sequelize.sync({ force: shouldSeed })
  .then(() => startServer(app))
  .then(() => seed(shouldSeed))
  .catch(function (err) {
    console.log(`Server failed to start due to error: ${err}`)
  })
