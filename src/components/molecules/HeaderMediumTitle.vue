<template>
  <o-text
    :m="$vuetify.breakpoint.smAndDown"
    :lg="$vuetify.breakpoint.mdAndDown"
    :xl="$vuetify.breakpoint.lgAndUp"
    bold
    :role="heading"
    :level="level"
    text-primary
  >
    <slot />
  </o-text>
</template>

<script>
import OText from '@/components/atoms/OText.vue'
export default {
  components: { OText },
  props: {
    bold: {
      type: Boolean,
      required: false,
      default: true
    },
    heading: {
      type: Boolean,
      required: false,
      default: false
    },
    level: {
      type: Number,
      required: false,
      default: null
    }
  }
}
</script>

<style>

</style>
