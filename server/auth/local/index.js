'use strict'

import omit from 'lodash/omit'
import express from 'express'
import passport from 'passport'
import { signToken } from './../auth.service'

const router = express.Router()

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    let error = err || info
    if (error) { return res.status(401).json(error) }
    if (!user) {
      return res.status(404).json({
        message: 'Something went wrong, please try again'
      })
    }

    res.json(
      {
        'token': signToken(user.id /*, user.role */),
        'user': omit(user.dataValues, ['password', 'salt'])
      })
  })(req, res, next)
})

export default router
