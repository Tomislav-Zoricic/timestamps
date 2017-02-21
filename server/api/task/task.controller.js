import { Task } from './../../sqldb'
import { getResult, entityNotFound, handleError } from './../helpers'

function index (req, res) {
  return Task.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

function show (req, res) {
  return Task.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(getResult(res))
    .then(entityNotFound(res))
}

export default {
  index,
  show
}
