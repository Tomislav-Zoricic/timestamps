'use strict'

import sqldb from './sqldb'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import passport from 'passport'
import session from 'express-session'
import methodOverride from 'method-override'
import expressSequelizeSession from 'express-sequelize-session'
import config from './../config.json'
let Store = expressSequelizeSession(session.Store)

export default function (app) {
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())

  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new Store(sqldb.sequelize)
  }))
}
