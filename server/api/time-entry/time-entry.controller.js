'use strict'

import { TimeEntry } from './../../sqldb'
import { getResult, entityNotFound, removeEntity, handleError } from './../helpers'

function index (req, res) {
  return TimeEntry.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

function show (req, res) {
  return TimeEntry.find({
    where: {
      id: req.params.id
    }
  })
  .then(entityNotFound(res))
  .then(getResult(res))
  .catch(handleError(res))
}

function create (req, res) {
  return TimeEntry.create(req.body)
    .then(getResult(res, 201))
    .catch(handleError(res))
}

function destroy (req, res) {
  return TimeEntry.find({
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
