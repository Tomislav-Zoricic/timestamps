'use strict'

import {
  AUTH_SUCCESS,
  AUTH_FAIL,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  SET_MESSAGE,
  LOGOUT
} from './mutation-types'

import apiUser from './../api/user.js'
import apiAuth from './../api/auth.js'
import { loginFailed,
         savedChangesSuccess,
         savedChangesError,
         emailTaken,
         logoutSuccess
       } from './../utils/messages.js'
import { redirectTo } from './../api/helpers/utils.js'
let storage = window.localStorage

// Saves user authentication upon page refresh / window close.
const initialAuth = () => {
  let hasEmail = !!storage.getItem('id_token')
  let hasIdToken = !!storage.getItem('email')

  return hasEmail && hasIdToken
}

const state = {
  authenticated: initialAuth(),
  user: {}
}

const storeUserLocal = (data) => {
  if (data) {
    storage.setItem('id_token', data.token)
    storage.setItem('email', data.user.email)
  } else {
    storage.removeItem('id_token')
    storage.removeItem('email')
  }
}

const setUser = (state, user) => {
  if (user) {
    state.user = user
    state.user.firstName = user['first_name']
    state.user.lastName = user['last_name']
  } else state.user = {}

  state.authenticated = !!user
}

const getters = {
  isAuthenticated: state => state.authenticated,
  user: state => state.user
}

const actions = {
  login (context, data) {
    apiAuth.login(data)
      .then(payload => {
        context.commit(AUTH_SUCCESS, { payload })
        redirectTo('home')
      })
      .catch(error => {
        context.commit(AUTH_FAIL, error)
        context.commit(SET_MESSAGE, [loginFailed])
      })
  },

  logout (context, payload) {
    context.commit(LOGOUT, payload)
    context.commit(SET_MESSAGE, [logoutSuccess])
    redirectTo('login')
  },

  register (context, data) {
    apiUser.getUser(data.email)
    .then(response => {
      context.commit(AUTH_FAIL)
      context.commit(SET_MESSAGE, [emailTaken])
    })
    .catch(() => {
      apiAuth.register(data)
        .then(payload => {
          context.commit(AUTH_SUCCESS, { payload })
          redirectTo('home')
        })
        .catch(error => {
          context.commit(AUTH_FAIL, error)
        })
    })
  },

  getUser (context, { email }) {
    apiUser.getUser(email)
      .then(payload => {
        context.commit(GET_USER_SUCCESS, { payload })
      })
      .catch(() => {
        context.commit(GET_USER_FAIL)
      })
  },

  updateUser (context, data) {
    apiUser.updateUser(data)
      .then(payload => {
        context.commit(GET_USER_SUCCESS, { payload })
        context.commit(SET_MESSAGE, [savedChangesSuccess])
      })
      .catch(() => {
        context.commit(GET_USER_FAIL)
        context.commit(SET_MESSAGE, [savedChangesError])
      })
  }
}

const mutations = {
  [AUTH_SUCCESS] (state, { payload }) {
    let token = payload.data.token
    let user = payload.data.user
    storeUserLocal({ token, user })
    setUser(state, user)
  },

  [AUTH_FAIL] (state, payload) {
    setUser(state)
  },

  [GET_USER_SUCCESS] (state, { payload }) {
    setUser(state, payload.data)
  },

  [GET_USER_FAIL] (state) {
    storeUserLocal()
    setUser(state)
  },

  [LOGOUT] (state, payload) {
    storeUserLocal()
    setUser(state)
  }
}

export default { state, getters, actions, mutations }
