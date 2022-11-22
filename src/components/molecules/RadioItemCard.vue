<template>
  <div
    class="card d-inline-flex flex-row pa-3 pb-0 mb-3"
    :class="{ disabled: size.disabled, 'padding-bottom: 0px !important': lastItem }"
  >
    <v-radio
      :value="size.SKU"
      :disabled="size.disabled"
      @change="onChange"
      hide-details
      color="var(--button-primary)"
      class="pb-3 override-color"
      :on-icon="size.disabled ? 'mdi-checkbox-blank-circle-outline' : 'mdi-check-circle'"
      :aria-label="size.size"
    >
      <!-- <template /> -->
    </v-radio>
    <div class="pb5 borderBottom" :class="{selected: selected && !size.disabled}">
      <span
        aria-hidden="true"
        class="font-weight-bold"
        :class="{ disabledText: size.disabled, selectedText: selected }"
      >
        {{ size.size }}
      </span>
      <span
        class="pl-2 pr-2"
        :class="{ disabledText: size.disabled, selectedText: selected }"
      >
        {{ size.subtitle }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: Boolean,
    lastItem: Boolean,
    size: {
      type: Object,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    onChange () {
      this.onClick(this.size)
    }
  }
}
</script>

<style scoped>
.card {
  border: 0px;
}

.borderBottom {
  float: none;
  overflow: hidden;
  border-bottom: 1px solid #e0e0e0;
  flex-grow: 100;
}

.disabled {
  /* background-color: #f6f6f6 !important; */
  opacity: .85;
}
.selected {
  border-color: var(--button-primary);
}
.disabledText {
  color: var(--text-disabled) !important;
}
.selectedText {
  color: var(--button-primary);
}
</style>
