<template>
  <v-select
    v-model="select"
    return-object
    outlined
    dense
    @change="onChange"
    v-bind="{ ...$props, ...$attrs }"
  />
</template>

<script>
export default {
  name: 'OSelect',
  data () {
    return {
      select: this.defaultValue || null
    }
  },
  mounted () {
    const element = document.querySelector('[aria-haspopup="listbox"]')
    element.role = 'combobox'
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onChange (a) {
      this.$emit('change', a)
    }
  },
  computed: {},
  watch: {
    defaultValue: function (newDef) {
      this.select = newDef
    }
  }
}
</script>

<style scoped>
.v-text-field fieldset,
.v-text-field .v-input__control,
.v-text-field .v-input__slot,
.v-text-field--outlined,
.v-text-field--solo {
  border-radius: var(--button-radius);
  font-family: var(--font-family)
}

</style>
