<template>
  <div class="tile">
    <v-divider class="my-0" role="presentation" />
    <v-list-item
      class="d-flex align-center tile "
      @click.prevent="onClickMethod"
      :ripple="false"
    >
      <o-text
        med
        class="ml-n2"
      >
        {{ item.name }}
      </o-text>
      <v-icon
        v-if="icon && !showLoading"
        color="#B7B7B7"
        class="ml-auto d-flex align-end"
        :class="{
          'mr-2': $vuetify.breakpoint.smAndDown,
          'mr-n1': $vuetify.breakpoint.mdAndUp,
        }"
        size="20"
        aria-label="select"
        role="img"
        v-text="icon"
      >
        {{ icon }}
      </v-icon>
      <v-progress-circular
        v-if="showLoading"
        :width="1"
        :active="showLoading"
        color="gray"
        :indeterminate="showLoading"
        class="ml-auto d-flex align-end"
      />
    </v-list-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OText from '@/components/atoms/OText.vue'

export default {
  name: 'ListItem',
  components: {
    OText
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: 'mdi-chevron-right'
    },
    index: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => ({})
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClickMethod (event) {
      this.$emit('onClick', event)
    }
  },
  computed: {
    ...mapGetters({ order: 'order/order' })

  }
}
</script>

<style scoped>
.tile {
  display: block;
  cursor: pointer;
  min-height: 64px;
}
.tile:hover,
.v-list-item--link:before {
  background: #f2f5ff;
}
.tile:active {
  background: #e1e6fa;
}
.tile:focus-visible {
  outline: 2px solid #545454;
}
</style>
