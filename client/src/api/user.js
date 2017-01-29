'use strict'

import { url, apis } from './../../../config.json'
import axios from 'axios'

export default {
  getUser (email) {
    return axios.request({
      method: 'get',
      url: `${url}/api/${apis.users}/${email}`
    })
  },

  updateUser ({ id, param, value }) {
    return axios.request({
      method: 'put',
      url: `${url}/api/${apis.users}/${id}`,
      data: { param, value }
    })
  }
}
