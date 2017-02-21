'use strict'

import VueRouter from 'vue-router'
import store from './vuex/store.js'

import overview from './components/overview/Overview.vue'
import projects from './components/project/Projects.vue'
import project from './components/project/Project.vue'
import projectDisplay from './components/project/ProjectDisplay.vue'

import projectUsers from './components/project/ProjectUsers.vue'
import projectTasks from './components/project/ProjectTasks.vue'
import projectTimesheets from './components/project/ProjectTimesheets.vue'
import projectCustomer from './components/project/ProjectCustomer.vue'

import account from './components/account/Account.vue'
import login from './components/auth/login/Login.vue'
import register from './components/auth/register/Register.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: overview,
    meta: { requiresAuth: true }
  },
  {
    name: 'projects',
    path: '/projects',
    component: projects,
    meta: { requiresAuth: true },
    children: [{
      name: 'selectedIssue',
      path: '/projects/selectedIssue/:id',
      component: projectDisplay,
      meta: { requiresAuth: true }
    }]
  },
  {
    name: 'project',
    path: '/project/:id',
    // redirect: '/project/:id/users',
    component: project,
    meta: { requiresAuth: true },
    children: [
      {
        name: 'projectUsers',
        path: '/project/:id/users',
        component: projectUsers,
        meta: { requiresAuth: true }
      },
      {
        name: 'projectTasks',
        path: '/project/:id/tasks',
        component: projectTasks,
        meta: { requiresAuth: true }
      },
      {
        name: 'projectTimesheets',
        path: '/project/:id/timesheets',
        component: projectTimesheets,
        meta: { requiresAuth: true }
      },
      {
        name: 'projectCustomer',
        path: '/project/:id/customer',
        component: projectCustomer,
        meta: { requiresAuth: true }
      }]
  },
  {
    name: 'account',
    path: '/people',
    component: account,
    meta: { requiresAuth: true }
  },
  {
    name: 'login',
    path: '/login',
    component: login,
    meta: { loggedIn: true }
  },
  {
    path: '/register',
    component: register,
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
