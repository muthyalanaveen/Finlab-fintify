<template>
  <v-footer
    id="home-footer"
    outlined
    absolute
    style="background-color: #ffffff"
    :class="{
      'pb-16 mb-2':
        this.isStickyButtonVisible && this.$vuetify.breakpoint.smAndDown,
      'pb-8': !this.isStickyButtonVisible && this.$vuetify.breakpoint.smAndDown,
      'pb-4 pt-2':
        !this.isStickyButtonVisible && this.$vuetify.breakpoint.mdAndUp,
      'pb-8': this.isStickyButtonVisible && this.$vuetify.breakpoint.mdAndUp,
    }"
  >
    <v-container>
      <v-row>
        <v-card
          class="d-flex align-center justify-center"
          flat
          tile
          aria-labelledby="Powered by Optoro"
        >
          <o-text
            sm
            class="pr-1"
          >
            {{ this.POWERED_BY }} FinLabs
          </o-text>
          <!-- <v-img
            :src="require('@/assets/images/logo.png')"
            max-width="50"
            max-height="20"
            alt="Finlabs"
          /> -->
        </v-card>
      </v-row>
      <div class="d-flex justify-content-between justify-center mt-4">
        <div>
          <a @keyup.enter.stop="openTermsLink">
          <o-text
            text
            sm
            tabindex="0"
            style="cursor:pointer;"
            aria-label="Terms of Service"
            @click.stop="openTermsLink"
            role="link"
          >
            {{ this.TERMS_OF_SERVICE }}
          </o-text>
        </a>
        </div>
        <div class="ml-6">
          <a @keyup.enter.stop="openPrivacyLink">
          <o-text
            text
            sm
            tabindex="0"
            style="cursor:pointer;"
            aria-label="Privacy Policy"
            @click.stop="openPrivacyLink"
            role="link"
          >
            {{ this.PRIVACY_POLICY }}
          </o-text>
        </a>
        </div>
      </div>
    </v-container>
  </v-footer>
</template>

<script>
import { mapGetters } from 'vuex'
import { FOOTER } from 'branding/strings.json'
import OText from '@/components/atoms/OText.vue'

export default {
  name: 'HomeFooter',
  components: {
    OText
  },
  data () {
    return {
      POWERED_BY: FOOTER.POWERED_BY,
      TERMS_OF_SERVICE: FOOTER.TERMS_OF_SERVICE,
      PRIVACY_POLICY: FOOTER.PRIVACY_POLICY
    }
  },
  computed: {
    ...mapGetters({
      isStickyButtonVisible: 'ui/isStickyButtonVisible'
    })
  },
  methods: {
    getFooterPadding () {
      var padding = 'pb-7'
      if (this.$vuetify.breakpoint.smAndDown) {
        padding = 'pb-8'
        if (this.isStickyButtonVisible) {
          padding = 'pb-16'
        }
      }
      return padding
    },
    openTermsLink () {
      const routeData = this.$router.resolve({ name: 'terms-of-service' })
      window.open(routeData.href, '_blank')
    },
    openPrivacyLink () {
      const routeData = this.$router.resolve({ name: 'privacy-policy' })
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style lang="sass">
#home-footer a
  text-decoration: none
</style>
