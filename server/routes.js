'use strict'

import userApi from './api/user'
import taskApi from './api/task'
import projectApi from './api/project'
import invoiceApi from './api/invoice'
import customerApi from './api/customer'
import timeEntryApi from './api/time-entry'
import authApi from './auth'

export default function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })
  app.use('/api/users', userApi)
  app.use('/api/tasks', taskApi)
  app.use('/api/projects', projectApi)
  app.use('/api/invoices', invoiceApi)
  app.use('/api/customers', customerApi)
  app.use('/api/time-entries', timeEntryApi)

  app.use('/auth', authApi)
}
