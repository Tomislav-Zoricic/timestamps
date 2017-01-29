'use strict'

import {
  GET_PROJECTS,
  GET_PROJECT
} from './mutation-types'

import api from './../api/project.js'

const state = {
  projects: [],
  activeProject: {}
}

const getters = {
  allProjects: state => state.projects,
  activeProject: state => state.activeProject
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

  getProject (context, id) {
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
    state.activeProject = project.data
  }
}

export default { state, getters, actions, mutations }
