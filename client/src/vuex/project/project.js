'use strict'

import {
  GET_PROJECTS,
  GET_PROJECT
} from './../mutation-types'

import { extractData } from './dataExtractor'

import api from './../../api/project.js'

const emptyProject = {
  data: {},
  users: [],
  tasks: [],
  customer: {}
  // NOTE try this with map, maybe better than pure object.
}

const state = {
  projects: [],
  project: emptyProject
}

const getters = {
  allProjects: state => state.projects,
  project: state => state.project,
  activeProject: state => state.project.data.id
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
    extractData(state.project, project.data)
  }
}

export default { state, getters, actions, mutations }
