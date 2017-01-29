'use strict'

const express = require('express')
const controller = require('./user.controller')
const auth = require('./../../auth/auth.service.js')
const router = express.Router()

router.get('/:email', controller.show)
router.get('/all', controller.index)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)
router.put('/:id', controller.upsert)
router.get('/me', auth.isAuthenticated(), controller.show)

module.exports = router
