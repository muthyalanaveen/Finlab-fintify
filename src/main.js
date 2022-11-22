// import { createApp } from "vue";

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import MaterialKit from './plugins/material-kit'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router/index'
import VueHead from 'vue-head'

import ApiService from './common/api.service'
import ErrorFilter from './common/error.filter'

ApiService.init()

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(MaterialKit)
Vue.use(VueHead)
Vue.config.productionTip = false

Vue.filter('error', ErrorFilter)

// createApp(App).mount("#app");

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
