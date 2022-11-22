<template>
  <div class="base" :class="{ selectedClass: selected, disabled: disabled }">
    <v-card
      :height="height"
      :width="width"
      class="mb-0 product-card-selector"
      flat
      tile
      v-on="$listeners"
      :aria-label="title !== '' ? title : 'product ' + sku"
      @click="!disabled && $emit('click', sku)"
      :disabled="disabled"
      :ripple="false"
    >
      <slot />
    </v-card>

    <v-card-actions
      v-if="title && enableText"
      :class="{'align-start': true}"
      @click="!disabled && $emit('click', sku)"
      :disabled="disabled"
      :ripple="false"
    >
      <div class="ml-0">
        <div
          v-if="title"
          space="0"
          class="headingSubTitleBoldPrimary mr-auto"
        >
          {{ title }}
        </div>

        <div
          v-if="subtitle && subtitleShow"
          space="0"
          class="headingSubTitleSmallPlain pt-1"
        >
          {{ subtitle }}
        </div>
      </div>
      <div v-if="displayPricing" class="ml-auto">
        {{ '$'+ this.$attrs.price }}
      </div>
      <v-spacer v-if="!displayPricing" />
      <div class="mr-n3" v-if="!basic">
        <v-radio
          v-if="!disabled"
          :value="sku"
          @change="onChange(sku)"
          :on-icon="'mdi-check-circle'"
          :disabled="disabled"
          color="var(--button-primary)"
          :aria-label="title"
        >
          <template />
        </v-radio>
      </div>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  inheritAttrs: false,
  components: {},
  props: {
    height: {
      type: [String, Number],
      required: false,
      default: 'auto'
    },
    width: {
      type: [String, Number],
      required: false,
      default: 'auto'
    },
    subtitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    basic: {
      type: Boolean,
      default: false
    },
    subtitleShow: {
      type: Boolean,
      default: true
    },
    enableText: {
      type: Boolean,
      default: true
    },
    displayPricing: {
      type: Boolean,
      default: false
    },
    original: Boolean,
    recommended: Boolean,
    selected: Boolean,
    disabled: Boolean,
    sku: {
      type: String,
      default: ''
    }
  },
  methods: {
    onChange (sku) {
      this.$emit('click', sku)
    }
  }
}
</script>
<style scoped>
.base {
  border: solid 2px #f2f5ff;
}
.selectedClass {
  border: solid 2px var(--button-primary);
}
.disabled {
  cursor: not-allowed;
  background-color: #f6f6f6;
  color: #969696;
}
</style>
