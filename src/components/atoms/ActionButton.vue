<template>
  <v-btn
    :ripple="false"
    elevation="0"
    v-bind="{ ...$props, ...$attrs }"
    @click.stop="onClickMethod"
    :class="{
      notRounded: notRounded,
      circle: circle,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      tertiaryColor: tertiaryColor,
    }"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    notRounded: Boolean,
    circle: Boolean,
    primaryColor: Boolean,
    secondaryColor: Boolean,
    tertiaryColor: Boolean
  },
  methods: {
    onClickMethod (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: var(--text-transform);
  border-radius: var(--button-radius);
  cursor: pointer;
  line-height: 1;
  font-weight: var(--button-font-weight, 500) !important;
  letter-spacing: 0.02rem !important;
}
.notRounded {
  border-radius: 2px !important;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: #d9d9d9 !important;
}
.primaryColor {
  background-color: var(--button-primary) !important;
  border-color: var(--button-primary-focus) !important;
  color: #ffffff !important;
}
.primaryColor::before {
  background-color: var(--button-primary) !important;
}
.primaryColor:hover {
  background-color: var(--button-primary-hover) !important;
}
.primaryColor:focus {
  outline: 4px solid var(--button-primary-focus) !important;
}
.secondaryColor {
  border-color: var(--button-secondary) !important;
  color: var(--button-secondary) !important;
}
.secondaryColor::before {
  background-color: var(--button-secondary) !important;
}
.secondaryColor:focus {
  outline: 4px solid var(--button-secondary-focus) !important;
}
.tertiaryColor {
  border-color: var(--button-tertiary) !important;
  color: var(--button-tertiary) !important;
}
.tertiaryColor::before {
  background-color: var(--button-tertiary) !important;
}
.tertiaryColor:focus {
  text-decoration: var(--button-tertiary-textDecoration);
}
.tertiaryColor:hover {
  text-decoration: var(--button-tertiary-textDecoration);
}
.tertiaryColor::before {
  display: var(--button-tertiary-display);
}
</style>
