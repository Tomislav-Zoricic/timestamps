'use strict'

import express from 'express'
import { User } from '../sqldb'

// Passport Configuration
require('./local/passport').setup(User)

const router = express.Router()

// Route is localhost:5000/auth/login/local
router.use('/login/local', require('./local').default)
export default router
