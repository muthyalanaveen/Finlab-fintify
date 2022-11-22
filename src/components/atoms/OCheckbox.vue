<template>
  <v-checkbox
    v-model="this.selectedData"
    v-bind="{...$props, ...$attrs}"
    @click.stop="click"
    :ripple="false"
  />
</template>

<script>
export default {
  name: 'OCheckbox',
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
