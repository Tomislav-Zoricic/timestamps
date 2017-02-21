'use strict'

import { Customer } from './../../sqldb'
import { getResult,
        entityNotFound,
        removeEntity,
        handleError } from './../helpers'

function index (req, res) {
  return Customer.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

function show (req, res) {
  return Customer.find({
    where: {
      id: req.params.id
    }
  })
  .then(entityNotFound(res))
  .then(getResult(res))
  .catch(handleError(res))
}

function create (req, res) {
  return Customer.create(req.body)
    .then(getResult(res, 201))
    .catch(handleError(res))
}

function destroy (req, res) {
  return Customer.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}

export default {
  index,
  show,
  create,
  destroy
}
