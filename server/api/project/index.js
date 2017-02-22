'use strict'

import express from 'express'
import controller from './project.controller'

const router = express.Router()

router.get('/', controller.index)
router.get('/:id', controller.show)
router.get('/:id/time-entries', controller.showTimeEntries)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)

export default router
