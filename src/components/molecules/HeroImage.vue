<template>
  <v-col
    md="5"
    :class="{ 'pa-0': $vuetify.breakpoint.smAndDown }"
    order-md="2"
  >
    <a :class="{'disabled': !RETAILER_SITE_LINK_HERO}" :href="RETAILER_SITE_LINK_HERO">
      <v-img
        :src="src"
        contain
        alt=""
      />
    </a>
  </v-col>
</template>

<script>
import { RETAILER_INFO } from 'branding/strings.json'

export default {
  name: 'HeroImage',
  data () {
    return {
      RETAILER_SITE_LINK_HERO: RETAILER_INFO.RETAILER_SITE_LINK_HERO
    }
  },
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
  }
}
</script>
