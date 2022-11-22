<template>
  <o-text
    :sm="$vuetify.breakpoint.mdAndDown"
    :base="$vuetify.breakpoint.lgAndUp"
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
    }
  }
}
</script>

<style>

</style>
