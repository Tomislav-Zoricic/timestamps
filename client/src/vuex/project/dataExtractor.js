'use strict'

import camelCase from 'camelcase'

let usersTasks = []
let newUsers = {}
let newTasks = {}

function clearPreviousData () {
  usersTasks = []
  newUsers = {}
  newTasks = {}
}

function camelCaseObject (obj) {
  let newObj = {}
  Object.keys(obj).forEach(key => {
    newObj[camelCase(key)] = obj[key]
  })

  return newObj
}

function getUsers (users) {
  users.forEach(user => {
    // Many to many users_tasks
    // NOTE maybe should be separated on backend?
    usersTasks.push(user['users_tasks'])

    let { id } = user
    // There can be multiple copies of user.
    if (!newUsers.hasOwnProperty(id)) {
      newUsers[id] = camelCaseObject(user)
      newUsers[id].taskIds = []
    }
  })
}

function getTasks (tasks) {
  // NOTE should you remove project_id?
  tasks.forEach(task => {
    let { id } = task
    newTasks[id] = camelCaseObject(task)
    newTasks[id].userIds = []
  })
}

// Many to many relationship.
function connectUsersTasks () {
  usersTasks.forEach(ut => {
    let { user_id: userId, task_id: taskId } = ut
    newUsers[userId].taskIds.push(taskId)
    newTasks[taskId].userIds.push(userId)
  })
}

// NOTE should all of these be done on backend?
export const extractData = (project, payload) => {
  clearPreviousData()
  let { data, users, tasks, customer } = payload

  project.data = camelCaseObject(data)
  project.customer = customer ? camelCaseObject(customer) : null

  getUsers(users)
  getTasks(tasks)
  connectUsersTasks(project)
  project.tasks = newTasks
  project.users = newUsers
}
