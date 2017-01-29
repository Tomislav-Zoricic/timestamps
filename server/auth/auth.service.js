'use strict'

import jwt from 'jsonwebtoken'
import { secrets } from './../../config.json'
import expressJwt from 'express-jwt'
import compose from 'composable-middleware'
import { User } from './../sqldb'

let validateJwt = expressJwt({ secret: secrets.jwt })

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated () {
  return compose()
    .use(function (req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`
      }

      validateJwt(req, res, next)
    })
    // Attach user to request
    .use(function (req, res, next) {
      User.find({
        where: { id: req.user.id }
      })
        .then(user => {
          if (!user) { return res.status(401).end }
          req.user = user
          next()
        })
        .catch(err => next(err))
    })
}

// Returns a jwt token signed by the app secret
export function signToken (id, role) {
  return jwt.sign({ id, role }, secrets.jwt, {
    expiresIn: 60 * 60 * 5
  })
}
