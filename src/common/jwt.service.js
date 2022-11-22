const ACCESS_TOKEN_KEY = 'access_token'

const getLocalStorageItem = (key) => window.localStorage.getItem(key)

const saveLocalStorageItem = (key, token) => window.localStorage.setItem(key, token)

const destroyLocalStorageItem = (key) => window.localStorage.removeItem(key)

// ------------------------------------------------------------------------------
// JWT SERVICE
// ------------------------------------------------------------------------------

const getAccessToken = () => getLocalStorageItem(ACCESS_TOKEN_KEY)

const saveAccessToken = (token) => saveLocalStorageItem(ACCESS_TOKEN_KEY, token)

const destroyAccessToken = () => destroyLocalStorageItem(ACCESS_TOKEN_KEY)

export default {
  getAccessToken,
  saveAccessToken,
  destroyAccessToken
}
