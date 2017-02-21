'use strict'

import express from 'express'
import controller from './invoice.controller'

const router = express.Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)

export default router
