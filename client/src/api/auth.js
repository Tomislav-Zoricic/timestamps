'use strict'

import { url, apis } from './../../../config.json'
import axios from 'axios'

export default {
  login ({ email, password }) {
    return axios.request({
      method: 'post',
      url: `${url}/${apis.auth}/login/local`,
      data: { email, password }
    })
  },
  register ({ email, password }) {
    return axios.request({
      method: 'post',
      url: `${url}/api/${apis.users}`,
      data: { email, password }
    })
  },
  relogin ({ email }) {
    return axios.request({
      method: 'get',
      url: `${url}/api/${apis.users}/${email}`
    })
  }
}
