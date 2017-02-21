'use strict'

import express from 'express'
import { User } from '../sqldb'

// Passport Configuration
import localRouter from './local'
import { setup } from './local/passport'
setup(User)

const router = express.Router()

// Route is localhost:5000/auth/login/local
router.use('/login/local', localRouter)
export default router
