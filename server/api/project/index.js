'use strict'

const express = require('express')
const controller = require('./project.controller')

const router = express.Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)

module.exports = router
