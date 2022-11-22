<template>
  <v-app class="overflow-hidden">
    <Header v-if="!isCurrentPageLogin" />
    <div class="mb-16">
      <router-view />
      <v-spacer :style=" $vuetify.breakpoint.mdAndUp ? 'height: 124px;' : 'height: 24px;'" />
    </div>
    <Footer v-if="!isStickyButtonVisible && !isCurrentPageLogin" />
  </v-app>
</template>

<script>
import Header from './components/layouts/Header.vue'
import Footer from './components/layouts/Footer.vue'
import '@/assets/temp.css'
import 'branding/colors.css'
import '@/assets/styles/color.css'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      currentPage: this.$router.history.current.name
    }
  },
  computed: {
    ...mapGetters({
      isStickyButtonVisible: 'ui/isStickyButtonVisible'
    }),
    isCurrentPageLogin () {
      return this.currentPage === 'login'
    }
  },
  watch: {
    $route (to) {
      this.currentPage = to.name
    }
  },
  head: {
    link: [
      {
        rel: 'icon',
        href: require('branding/assets/images/fav.png')
      }
    ]
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Inter&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  @import url('https://fonts.googleapis.com/css?family=Montserrat');

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }
  html, body, h1, h2, h3, h4, h5, h6, p, span {
    /* overflow-y: auto !important; */
    font-family: var(--font-family);
  }
  .v-application {
    font-family: var(--font-family);
 }

</style>
