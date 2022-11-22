import Vue from 'vue'
import Vuex from 'vuex'
// Store Modules
import order from './modules/order'
import ui from './modules/ui'
import returns from './modules/returns'
import exchange from './modules/exchange'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    order,
    ui,
    returns,
    exchange
  },
  plugins: []
})
