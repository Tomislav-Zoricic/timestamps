'use strict'

export const fetchProject = ({ $route: route, $store: store }) => {
  let nextId = route.params.id
  let currId = store.getters.activeProject

  // Current id can't be available upon first page landing.
  if (nextId && nextId !== currId) {
    store.dispatch('getProject', { id: nextId })
  }
}

export const fetchAllProjects = ({ $store: store }) => {
  store.dispatch('getProjects')
}
