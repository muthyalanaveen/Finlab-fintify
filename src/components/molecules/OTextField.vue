<template>
  <div>
    <!-- <label :for="id"> {{ title }}</label> -->
    <o-text
      sm
      bold
      class="mb-3"
    >
      <label :for="id">{{ title }}</label>
    </o-text>
    <v-text-field
      @keyup="onChangeMethod($event)"
      @keydown.enter.prevent="onKeyEnterEvent($event)"
      @paste="onPasteMethod($event)"
      autocomplete="off"
      outlined
      class="rounded-0"
      height="49px"
      v-bind="{ ...$props, ...$attrs }"
      :placeholder="placeholder"
      :name="id"
      :aria-labelledby="id"
    />
  </div>
</template>

<script>
import OText from '@/components/atoms/OText.vue'

export default {
  name: 'OTextField',
  components: {
    OText
  },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    onChange: {
      type: Function,
      required: false,
      default: () => {}
    },
    onKeyEnter: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  methods: {
    onChangeMethod (event) {
      this.$emit('onChange', event)
    },
    onKeyEnterEvent (event) {
      this.$emit('onKeyEnter', event)
    },
    onPasteMethod (event) {
      this.$emit('onPaste', event)
    }
  }
}
</script>

<style>
.v-input--is-focused .v-input__slot fieldset {
  -webkit-box-shadow: var(--button-tertiary-boxShadow);
  -moz-box-shadow: var(--button-tertiary-boxShadow);
  box-shadow: var(--button-tertiary-boxShadow);
  transition: none !important;
  border: var(--button-tertiary-border) !important;
}
.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot:hover
  fieldset {
  -webkit-box-shadow: var(--button-tertiary-boxShadow);
  -moz-box-shadow: var(--button-tertiary-boxShadow);
  box-shadow: var(--button-tertiary-boxShadow);
  transition: none !important;
}
.v-text-field .v-input__control .v-input__slot {
  min-height: auto !important;
  display: flex !important;
  align-items: center !important;
  caret-color: auto;
}
</style>
