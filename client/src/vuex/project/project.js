'use strict'

import {
  GET_PROJECTS,
  GET_PROJECT,
  GET_PROJECT_TIME_ENTRIES
} from './../mutation-types'

import { extractData } from './dataExtractor'

import api from './../../api/project.js'

const emptyProject = {
  data: {},
  users: new Map(),
  tasks: new Map(),
  customer: {},
  timeEntries: []
}

const state = {
  projects: [],
  project: emptyProject
}

const getTimeEntryDetails = state => {
  let timeEntries = state.project.timeEntries
  let users = state.project.users
  let tasks = state.project.tasks

  if (!timeEntries.length) return []

  return timeEntries.map(te => {
    let { firstName, lastName } = users.get(parseInt(te['user_id']))
    let { name: taskName, rate } = tasks.get(te['task_id'])
    let { amount, date } = te

    return {
      firstName,
      lastName,
      taskName,
      rate,
      amount,
      date
    }
  })
}

const getters = {
  allProjects: state => state.projects,
  project: state => state.project,
  activeProject: state => state.project.data.id,
  timeEntries: state => getTimeEntryDetails(state)
}

const actions = {
  getProjects (context) {
    api.getProjects()
      .then(projects => {
        context.commit(GET_PROJECTS, { projects })
      })
      .catch(error => {
        console.log('STUP error', error)
      })
  },

  getProject (context, { id }) {
    api.getProject(id)
      .then(project => {
        context.commit(GET_PROJECT, { project })
      })
      .catch(error => {
        console.log('STUP error', error)
      })
  },

  getTimeEntries (context, { id }) {
    api.getTimeEntries(id)
      .then(timeEntries => {
        context.commit(GET_PROJECT_TIME_ENTRIES, timeEntries)
      })
      .catch(error => {
        console.log('STUP error', error)
      })
  }
}

const mutations = {
  [GET_PROJECTS] (state, { projects }) {
    state.projects = projects.data
  },

  [GET_PROJECT] (state, { project }) {
    extractData(state.project, project.data)
  },

  [GET_PROJECT_TIME_ENTRIES] (state, { data }) {
    state.project.timeEntries = data
  }
}

export default { state, getters, actions, mutations }
