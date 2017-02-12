'use strict'

const express = require('express')
const controller = require('./task.controller')

const router = express.Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.indexById)

module.exports = router
