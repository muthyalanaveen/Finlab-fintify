<template>
  <o-text
    heading
    :level="Number(1)"
    :xl="$vuetify.breakpoint.mdAndDown"
    :xl2="$vuetify.breakpoint.lgAndUp"
    bold
    text-primary
    class="my-3"
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
