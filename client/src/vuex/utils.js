'use strict'

import {
  SET_MESSAGE
} from './mutation-types'

const state = {
  messages: []
}

const getters = {
  messages: state => state.messages
}

const actions = {
  setMessage (context, payload) {
    context.commit('SET_MESSAGE', payload)
  }
}

const mutations = {
  [SET_MESSAGE] (state, messages = []) {
    state.messages = messages
  }
}

export default { state, getters, actions, mutations }
