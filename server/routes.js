'use strict'

export default function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })
  app.use('/api/users', require('./api/user'))
  app.use('/api/tasks', require('./api/task'))
  app.use('/api/projects', require('./api/project'))
  app.use('/api/invoices', require('./api/invoice'))
  app.use('/api/customers', require('./api/customer'))
  app.use('/api/time-entries', require('./api/time-entry'))

  app.use('/auth', require('./auth').default)
}
