import { defaultTo } from 'lodash'

export const buildVersion = defaultTo(process.env.VUE_APP_BUILD_VERSION, 'local')
export const appEnvironment = defaultTo(process.env.VUE_APP_ENVIRONMENT, 'development')
export const apiUrl = defaultTo(process.env.VUE_APP_API_URL, 'https://rousseau-server-dev-35p4sd6gla-ue.a.run.app/api')
export const optiturnId = defaultTo(process.env.VUE_APP_OPTITURN_ID, null)
export const mapsApiKey = defaultTo(process.env.VUE_APP_MAPS_API_KEY, null)
export const appSecureText = defaultTo(process.env.VUE_APP_SECURE_TEXT, null)
export const appLoginRequired = defaultTo(process.env.VUE_APP_LOGIN_REQUIRED, null)

export default {
  buildVersion,
  appEnvironment,
  apiUrl,
  optiturnId,
  mapsApiKey,
  appSecureText,
  appLoginRequired
}
