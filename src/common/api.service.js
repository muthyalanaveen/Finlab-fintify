import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import JwtService from './jwt.service'
import { apiUrl } from './config'
import { trimExtraSpacesFromStringsInObject } from '@/utils'
import { CONSTANTS } from '@/constants'

const protectRoute = async (cb, protect = true) => {
  if (protect) {
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${JwtService.getAccessToken()}`
  }

  return cb().catch((error) => {
    throw error

  })
}

const ApiService = {
  init () {
    Vue.use(VueAxios, axios)
    Vue.axios.defaults.baseURL = apiUrl
    ApiService.setHeader()
  },

  setHeader () {
    Vue.axios.defaults.headers['X-ID'] = 'id'
  },

  query: (resource, params, protect = true) =>
    protectRoute(
      () => Vue.axios.get(resource, trimExtraSpacesFromStringsInObject(params)),
      protect
    ),

  get: (resource, slug = '', protect = true) =>
    protectRoute(() => Vue.axios.get(`${resource}/${slug}`), protect),

  post: (resource, params, protect = true) =>
    protectRoute(() => Vue.axios.post(`${resource}`, params), protect),

  update: (resource, slug, params, protect = true) =>
    protectRoute(() => Vue.axios.put(`${resource}/${slug}`, params), protect),

  put: (resource, params, protect = true) =>
    protectRoute(() => Vue.axios.put(`${resource}`, params), protect),

  delete: (resource, protect = true) =>
    protectRoute(() => Vue.axios.delete(resource), protect)
}

export default ApiService

export const FetchOrderService = {
  getOrder () {
    return ApiService.query(`${CONSTANTS.API_VERSION}/orders/`)
  }
}

