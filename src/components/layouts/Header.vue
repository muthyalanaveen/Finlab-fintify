<template>
  <nav class="navbar">
    <v-row class="container-fluid">
      <a :class="{'disabled': !RETAILER_SITE_LINK_LOGO}" :href="RETAILER_SITE_LINK_LOGO">
        <v-img
          :src="logoImage"
          style="margin: 0 auto"
          max-width="200px"
          max-height="50px"
          contain
          :alt="RETAILER_NAME + ' Logo'"
        />
      </a>
    </v-row>
  </nav>
</template>

<script>
import logoImage from 'branding/assets/images/logo.png'
import { RETAILER_INFO } from 'branding/strings.json'

export default {
  data () {
    return {
      logoImage,
      RETAILER_NAME: RETAILER_INFO.RETAILER_NAME || '',
      RETAILER_SITE_LINK_LOGO: RETAILER_INFO.RETAILER_SITE_LINK_LOGO
    }
  },
  computed: {
  }
}
</script>

<style scoped >
.navbar {
  width: 100%;
}

.disabled {
  pointer-events: none;
}

.navbar .container-fluid {
  background-color: #fff !important;
  box-shadow: 0px 0.5px 0px 0.5px #d8d8d8;
  height: 4.5em;
}

#build-version {
  position: fixed;
  top: 0;
  left: 0;
  padding: 5px;
}
</style>
