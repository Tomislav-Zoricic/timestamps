import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import router from './router'

Vue.use(VueRouter)
Vue.use(Vuex)

// Event bus.
let bus = new Vue({})

new Vue({
  el: '#app',
  router,
  render: h => h(require('./App.vue')),
  data: { bus }
})

export default router
