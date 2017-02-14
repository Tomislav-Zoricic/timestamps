'use strict'

import {
  GET_PROJECTS,
  GET_PROJECT
} from './mutation-types'

import api from './../api/project.js'

const state = {
  projects: [],
  project: {
    data: {},
    users: [],
    tasks: [],
    customer: {}
  }
}

const getters = {
  allProjects: state => state.projects,
  project: state => state.project
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
  }
}

const mutations = {
  [GET_PROJECTS] (state, { projects }) {
    state.projects = projects.data
  },

  [GET_PROJECT] (state, { project }) {
    state.project = project.data

    // NOTE find better way to do this.
    // NOTE omit customer_id after this.
    state.project.data.customerId = project.data.data['customer_id']
  }
}

export default { state, getters, actions, mutations }
