<template>
  <div
    class="my-16"
    style="max-width: 664px; margin: auto;"
    :class="{ 'mx-8': $vuetify.breakpoint.smAndDown }"
  >
    <header-title>
      Terms of Service
    </header-title>
    <h5 class="my-4 mt-16">
      Effective Date: March 9, 2022
    </h5>
    <o-text class="py-3">
      Please read these Terms of Service (&quot;Terms&quot;) carefully before
      accessing or using the Mckinsey returns portal and related services (the
      &quot;Services&quot;) owned and operated by Mckinsey, Inc.
      (&quot;Mckinsey&quot;, &quot;we&quot; or &quot;us&quot;). By accessing or
      using the Services, you agree to be bound by these Terms, which are a
      legal agreement between us and you.
    </o-text>
    
  </div>
</template>

<script>
import OText from '@/components/atoms/OText.vue'
import HeaderTitle from '@/components/molecules/HeaderTitle.vue'

export default {
  props: {
    visible: Boolean
  },
  components: { OText, HeaderTitle },
  data () {
    return {}
  },
  mounted () {},
  computed: {
    show: {}
  }
}
</script>

<style scoped>
.container {
  padding-top: 60px;
}
</style>
