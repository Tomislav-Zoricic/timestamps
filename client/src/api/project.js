'use strict'

import axios from 'axios'
import { url, apis } from './../../../config.json'
import headers from './helpers/headers.js'

export default {
  getProjects () {
    return axios.request({
      method: 'get',
      url: `${url}/api/${apis.projects}`,
      headers: headers()
    })
  },

  getProject (id) {
    return axios.request({
      method: 'get',
      url: `${url}/api/${apis.projects}/${id}`
    })
  },

  getTimeEntries (id) {
    return axios.request({
      method: 'get',
      url: `${url}/api/${apis.projects}/${id}/time-entries`
    })
  }
}
