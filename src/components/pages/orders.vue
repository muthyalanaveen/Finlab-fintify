<template>
  <router-view />
</template>

<script>
import { mapGetters } from 'vuex'
import { CONSTANTS } from '@/constants'

export default {
  name: 'Orders',
  components: {},
  data () {
    return {}
  },
  computed: {
    ...mapGetters({ order: 'order/order', isGiftReturn: 'ui/isGiftReturn' })
  },
  mounted () {
    if (this.order.order_hash === '' && !this.$route.path.includes('tracker')) {
      let str = this.$route.params.id
      if (this.$route.query?.order_id && this.$route.query?.zip_code) {
        str = `${CONSTANTS.API_VERSION}?order_id=${this.$route.query?.order_id}&zip_code=${this.$route.query?.zip_code}`
      }

      this.$router.push('/orders/' + str)
    }
  },
  methods: {}
}
</script>

<style scoped></style>
