import { getToken } from './utils.js'

export default () => {
  let token = getToken()
  let headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers = Object.assign({}, headers, {
      Authorization: `Token ${token}`
    })
  }

  return headers
}
