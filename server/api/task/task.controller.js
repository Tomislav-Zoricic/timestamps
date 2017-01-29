import { Task } from './../../sqldb'
import { getResult, entityNotFound, handleError } from './../helpers'

export function index (req, res) {
  return Task.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

export function show (req, res) {
  return Task.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(getResult(res))
    .then(entityNotFound(res))
}
