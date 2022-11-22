import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3356e4',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        snackbarGreen: '#00812c'
      }
    }
  }
})

/*
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default.css'
import "@/assets/styles/scss/material-kit.scss";
import "@/assets/demo.css";

import globalMixins from "./globalMixins";

Vue.use(Vuetify);

export default new Vuetify({
    install(Vue) {
        Vue.use(Vuetify);
        Vue.use(globalMixins, {
          observer: true,
          // optional
          observerOptions: {
            rootMargin: "0px",
            threshold: 0.1
          }
        });
      }
});
*/
