'use strict'

import { Project, Task, Customer, TimeEntry } from './../../sqldb'
import { getResult,
         entityNotFound,
         handleError,
         removeEntity,
         removeAuthData } from './../helpers'

function index (req, res) {
  return Project.findAll()
    .then(getResult(res))
    .catch(handleError(res))
}

// NOTE maybe also add extra routes for getting customer, tasks and users separately?
// NOTE find in sequelize way to get only users_tasks relationship values.
function show (req, res) {
  let id = req.params.id
  let project = {}
  let customer = {}

  // Project
  return Project.findById(id)
  // Customer
  .then(proj => {
    project = proj
    return Customer.findOne({ where: { id } })
  })
  // Tasks
  .then(cust => {
    customer = cust
    return Task.findAll({ where: { 'project_id': id } })
  })
  // Users
  .then(tasks => {
    return Promise.all(getUsers(tasks))
      .then(users => {
        return {
          data: project,
          users: sanitizeUsers(users),
          tasks,
          customer
        }
      })
  })
  .then(entityNotFound(res))
  .then(getResult(res))
  .catch(handleError(res))
}

function showTimeEntries (req, res) {
  let id = req.params.id
  return TimeEntry.findAll({ where: { 'project_id': id } })
    .then(entityNotFound(res))
    .then(getResult(res))
    .catch(handleError(res))
}

function create (req, res) {
  return Project.create(req.body)
    .then(getResult(res, 201))
    .catch(handleError(res))
}

function destroy (req, res) {
  return Project.find({
    where: { id: req.params.id }
  })
    .then(entityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}

function getUsers (tasks) {
  let users = tasks.map(task => {
    return task.getUsers()
  })

  return users
}

function sanitizeUsers (users) {
  let sanitizedUsers = []
  users.forEach(user => {
    sanitizedUsers.push(...user)
  })

  return sanitizedUsers.map(user => {
    return removeAuthData(user)
  })
}

export default {
  index,
  show,
  showTimeEntries,
  create,
  destroy
}
