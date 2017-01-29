import router from './../../main.js'

const storage = window.localStorage

export const redirectTo = routeName => {
  router.push({ name: routeName })
}

export const getToken = () =>
  storage.getItem('id_token')

export const setToken = token => {
  storage.setItem('id_token', token)
}

export const removeToken = () => {
  storage.removeItem('id_token')
}
