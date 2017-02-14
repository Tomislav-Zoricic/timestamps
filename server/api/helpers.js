'use strict'

import omit from 'lodash/omit'

export function getResult (res, statusCode) {
  statusCode = statusCode || 200
  return function (entity) {
    if (entity) return res.status(statusCode).json(entity)
    return res.status(404).end()
  }
}

export function entityNotFound (res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }
}

export function removeEntity (res) {
  return function (entity) {
    if (entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end()
        })
    }
  }
}

export function handleError (res, statusCode) {
  statusCode = statusCode || 500
  return function (err) {
    res.status(statusCode).send(err)
  }
}

export function removeAuthData (user) {
  return omit(user.dataValues, ['password', 'salt'])
}
