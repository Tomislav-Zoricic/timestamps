'use strict'

import VueRouter from 'vue-router'
import store from './vuex/store.js'

const routes = [
  {
    name: 'home',
    path: '/',
    component: require('./components/overview/Overview.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'projects',
    path: '/projects',
    component: require('./components/project/Projects.vue'),
    meta: { requiresAuth: true },
    children: [{
      name: 'selectedIssue',
      path: '/projects/selectedIssue/:id',
      component: require('./components/project/ProjectDisplay.vue'),
      meta: { requiresAuth: true }
    }]
  },
  {
    name: 'project',
    path: '/project/:id',
    component: require('./components/project/Project.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'account',
    path: '/people',
    component: require('./components/account/Account.vue'),
    meta: { requiresAuth: true }
  },
  {
    name: 'login',
    path: '/login',
    component: require('./components/auth/login/Login.vue'),
    meta: { loggedIn: true }
  },
  {
    path: '/register',
    component: require('./components/auth/register/Register.vue'),
    meta: { loggedIn: true }
  }
]

let router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  let authenticated = store.getters.isAuthenticated

  // Clear messages before leaving the route.
  store.dispatch('setMessage')

  if (to.meta.requiresAuth) {
    // First page landing, check whether user is authenticated.
    if (!from.name && authenticated) {
      store.dispatch('getUser', {
        email: window.localStorage.getItem('email')
      }).then(() => { next() })
        .catch(() => { next({ name: 'login' }) })
    } else {
      authenticated ? next() : next({ name: 'login' })
    }
  } else if (to.meta.loggedIn) {
    !authenticated ? next() : next({ name: 'home' })
  } else { next() }
})

export default router
