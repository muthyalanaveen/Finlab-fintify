<template>
  <v-row justify="center">
    <v-expansion-panels
      v-model="getOpenedPanel"
      accordion
      style="border-radius: 0px;"
    >
      <v-expansion-panel
        v-for="(option, i) in options"
        :key="i"
      >
        <v-expansion-panel-header
          class="bg-well"
          @click="handleSelection(option)"
          aria-expanded="false"
        >
          <div class="accordion-item-header">
            <o-text>{{ option.primaryText }}</o-text>
            <o-text
              bold
              class="normalWt"
              v-if="option.secondaryText"
            >
              {{ option.secondaryText }}
            </o-text>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="bg-well px-2">
          <slot />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>
<script>
import OText from '@/components/atoms/OText.vue'
export default {
  name: 'PriceAccordion',
  components: {
    OText
  },
  props: {
    options: {
      type: Array,
      required: true
    },
    handleSelection: {
      type: Function,
      required: true
    },
    openedPanel: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    getOpenedPanel () {
      return this.openedPanel
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-item-header {
    display: flex;
    justify-content: space-between;
}

.v-expansion-panel::before {
  box-shadow: none;
}

.v-expansion-panel-content::v-deep .v-expansion-panel-content__wrap {
  padding: 0 !important;
}

.v-expansion-panel-content {
  margin-bottom: 1rem;
}

</style>
