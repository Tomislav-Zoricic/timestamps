'use strict'

import snakeCase from 'lodash/snakeCase'
import faker from 'faker'
import { User } from './../../sqldb'
import { getResult,
         entityNotFound,
         handleError,
         removeEntity,
         removeAuthData} from './../helpers'
import { signToken } from './../../auth/auth.service'

export function index (req, res) {
  return User.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

export function show (req, res) {
  let condition = {}
  if (req.params.email) condition = { email: req.params.email }
  else if (req.params.id) condition = { id: req.params.id }

  return User.find({ where: condition })
  .then(getResult(res))
  .catch(handleError(res))
}

export function create (req, res) {
  // TODO decide between registering with first name and last name
  // or after registering with email/password going through the
  // menu for changing the names/image/everything needed.
  let data = req.body
  data.first_name = faker.name.firstName()
  data.last_name = faker.name.lastName()

  let newUser = User.build(data)

  return newUser.save()
    .then(user => {
      res.json(
        {
          'token': signToken(user.id /*, user.role */),
          'user': removeAuthData(user.dataValues)
        })
    })
    .catch(handleError(res))
}

export function destroy (req, res) {
  return User.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}

export function changePassword (req, res) {
  let oldPass = String(req.body.oldPassword)
  let newPass = String(req.body.newPassword)

  return User.find({
    where: { id: req.user.id }
  })
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass
        return user.save()
          .then(() => { res.status(204).end() })
          .catch(handleError(res))
      } else {
        return res.status(403).end()
      }
    })
}

export function upsert (req, res) {
  let updateData = {}
  updateData[snakeCase(req.body.param)] = req.body.value

  return User.find({
    where: { id: req.params.id }
  })
    .then(user => {
      user.update(updateData)
        .then(user => { res.json(user).end() })
        .catch(handleError(res))
    })
}
