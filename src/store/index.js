import Vue from 'vue'
import Vuex from 'vuex'
// Store Modules
import ui from './modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui
  },
  plugins: []
})
