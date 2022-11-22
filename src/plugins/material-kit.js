import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import '@/assets/styles/scss/material-kit.scss'
import '@/assets/demo.css'
// import Vuetify from 'vuetify/lib/framework';

import globalMixins from './globalMixins'

export default {
  install (Vue) {
    Vue.use(VueMaterial)
    Vue.use(globalMixins, {
      observer: true,
      // optional
      observerOptions: {
        rootMargin: '0px',
        threshold: 0.1
      }
    })
  }
}
