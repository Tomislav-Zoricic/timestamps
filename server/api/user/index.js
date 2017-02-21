'use strict'

import express from 'express'
import controller from './user.controller'
import { isAuthenticated } from './../../auth/auth.service.js'
const router = express.Router()

router.get('/:email', controller.show)
router.get('/all', controller.index)
router.post('/', controller.create)
router.delete('/:id', controller.destroy)
router.put('/:id', controller.upsert)
router.get('/me', isAuthenticated(), controller.show)

export default router
