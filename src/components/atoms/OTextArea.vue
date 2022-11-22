<template>
  <div>
    <!-- <label :for="id"> {{ title }}</label> -->
    <v-textarea
      outlined
      dense
      class="rounded-0"
      :placeholder="placeholder"
      @keyup="onChangeMethod($event)"
      maxlength="500"
      v-bind="{
        rows: 9,
        ...$props,
        ...$attrs,
      }"
      v-on="$listeners"
      :name="id"
      :aria-label="title"
    />
    <o-text
      class="d-flex justify-end"
      xs
      secondary
      style="margin-top: -1rem;"
    >
      Limit: 500 characters
    </o-text>
  </div>
</template>

<script>
import OText from '@/components/atoms/OText.vue'
export default {
  name: 'OTextarea',
  components: {
    OText
  },
  props: {
    title: {
      type: String,
      required: true,
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
    }
  }
}
</script>

<style lang="sass">
</style>
