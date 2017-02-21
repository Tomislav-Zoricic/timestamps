import Vue from 'vue'
import Vuex from 'vuex'
import utils from './utils.js'
import auth from './auth.js'
import project from './project/project.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: { utils, project, auth }
})
