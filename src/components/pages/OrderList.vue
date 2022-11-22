<template>
  <div>
    <div>
      <template v-for="(item, index) in this.order.order.items">
        <product-list-item-view
          :key="index"
          :item="item"
          :order-brand="order.order.concept || ''"
          :index="index"
          :class="{
            'ml-1': $vuetify.breakpoint.smAndDown,
          }"
        />
      </template>
    </div>
    <div
      v-if="this.order.order.items.length === 0"
      class="d-flex justify-center align-center mt-12"
    >
      <o-text md>
        No item(s) to return
      </o-text>
    </div>
  </div>
</template>

<script>
import ProductListItemView from '@/components/organism/ProductListItemView.vue'
import { mapGetters } from 'vuex'
import OText from '@/components/atoms/OText.vue'

export default {
  name: 'OrderList',

  components: {
    ProductListItemView,
    OText
  },

  computed: {
    ...mapGetters({ order: 'order/order' })
  },

  data () {
    return {}
  },

  props: {},

  methods: {},

  mounted () {}
}
</script>

<style scoped></style>
