<template>
  <o-select
    hide-details="auto"
    class="fullWidth"
    :items="this.items"
    :item-text="(x) => x.size + ' ' + x.subtitle"
    return-object
    outlined
    dense
    @change="onChange"
    :default-value="this.defaultValue"
  >
    <template slot="selection" slot-scope="data">
      <span class="boldText">{{ data.item.size }}</span>
      <div class="ml-2">
        {{ data.item.subtitle }}
      </div>
    </template>
    <template slot="item" slot-scope="data">
      <div>
        <span class="boldText">{{ data.item.title }}</span>
        {{ data.item.subtitle }}
      </div>
    </template>
  </o-select>
</template>

<script>
import OSelect from '@/components/atoms/OSelect.vue'
export default {
  name: 'SizeDropdown',
  components: {
    OSelect
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    defaultValue: {
      type: Object,
      required: true,
      default: () => {}
    },
    onChange: {
      type: Function,
      required: false,
      default: () => {}
    }
  },
  data: () => ({
    reset: false
  }),
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

<style scoped>
.v-select{
  font-weight: bold;
}
</style>
