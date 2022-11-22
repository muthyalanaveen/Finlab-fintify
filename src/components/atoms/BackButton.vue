<template>
  <v-btn
    icon
    text
    :disabled="disabled"
    style="
          background-color:#ffffff;
          color:var(--button-primary);"
    @click="handleClick"
    class="circle align-start mt-4"
    alt="back"
    aria-label="back"
  >
    <v-icon
      style="color: var(--button-primary);"
      small
    >
      arrow_back
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    overrideGoBack: {
      type: Boolean,
      required: false,
      default: false
    },
    overrideOnClick: {
      type: Function,
      required: false,
      default: () => { console.log('onClick') }
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    handleClick () {
      return this.overrideGoBack ? this.overrideOnClick() : this.$router.go(-1)
    }
  }
}
</script>

<style>
.circle {
  display: inline-block;
  border-radius: 60px;
  border: 0.2px solid #c8c8c8;
  padding: 0.4em 0.6em;
}
</style>
