<template>
  <div>
    <o-text
      text-blue
      style="cursor: pointer; display: flex;"
      :o-text-style="'display: flex'"
      :class="noPadding ? '' : 'mt-4 mb-2'"
      @click.stop="() => { openMapModal === null ? openModal({ type: dialogType }) : openMapModal()}"
    >
      <v-img
        max-height="20"
        max-width="20"
        class="mr-2"
        color="#3356e4"
        src="@/assets/images/location_blue.svg"
        alt=""
      />
      {{ formattedAddress || "N/A" }}
    </o-text>
  </div>
</template>

<script>
import OText from '@/components/atoms/OText.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    OText
  },
  props: {
    dialogType: {
      required: true,
      type: String
    },
    noPadding: {
      required: false,
      type: Boolean,
      default: false
    },
    formattedAddress: {
      required: false,
      type: String,
      default: ''
    },
    openMapModal: {
      required: false,
      type: Function,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      openModal: 'returns/openModal'
    })
  }
}
</script>

<style>
</style>
