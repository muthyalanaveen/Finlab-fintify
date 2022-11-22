<template>
  <v-radio
    v-model="this.selectedData"
    :on-icon="'mdi-check-circle'"
    v-bind="{...$props, ...$attrs}"
    @click.stop="click"
    :ripple="false"
  />
</template>

<script>
export default {
  name: 'ORadio',
  props: {
    selected: Boolean
  },
  data () {
    return {
      selectedData: this.selected
    }
  },
  methods: {
    click: function (e) {
      this.$emit('click')
    }
  }
}
</script>
<style scoped>
</style>
