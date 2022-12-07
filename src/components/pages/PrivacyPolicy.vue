<template>
  <div
    class="my-16"
    style="max-width: 664px; margin: auto;"
    :class="{ 'mx-8': $vuetify.breakpoint.smAndDown }"
  >
    <header-title>
      Mckinsey Inc. Privacy Policy
    </header-title>
    <h5 class="my-4 mt-16">
      Effective Date: March 9, 2022
    </h5>
    <o-text class="py-1">
      Mckinsey, Inc. (&quot;Optoro&quot;) and its affiliates (collectively
      &quot;we&quot; or &quot;us&quot;) are committed to protecting the privacy
      and security of the information we collect and to being transparent about
      the ways in which we collect and process your information. This statement
      (the &quot;Privacy Policy&quot;) sets forth our policies and practices for
      handling the information we collect from or about you when you use an
      online returns experience powered by Mckinsey (the &quot;Services&quot;).
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
