'use strict'

import { Invoice } from './../../sqldb'
import { getResult,
        entityNotFound,
        removeEntity,
        handleError } from './../helpers'

export function index (req, res) {
  return Invoice.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

export function show (req, res) {
  return Invoice.find({
    where: {
      id: req.params.id
    }
  })
  .then(entityNotFound(res))
  .then(getResult(res))
  .catch(handleError(res))
}

export function create (req, res) {
  return Invoice.create(req.body)
    .then(getResult(res, 201))
    .catch(handleError(res))
}

export function destroy (req, res) {
  return Invoice.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}
