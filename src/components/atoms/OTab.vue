<template>
  <div>
    <v-tabs
      v-model="active_tab"
      color="var(--button-tertiary)"
      slider-color="var(--button-tertiary)"
      height="56px"
      slider-size="1"
      grow
    >
      <v-tab
        v-for="tab of tabs"
        :key="tab.index"
        :ripple="false"
        class="o-tab pr-2 pl-2"
      >
        <v-col class="d-flex justify-center align-center">
          <o-text
            class="pb-3"
            v-html="tab.name"
          />
          <div
            v-if="tab.index !== active_tab"
            class="v-tabs-slider-wrapper"
            style="height: 1px; width: 100%; color: #D9D9D9"
          >
            <div class="v-tabs-slider" />
          </div>
        </v-col>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="active_tab" touchless>
      <v-tab-item
        v-for="tab of tabs"
        :key="tab.index"
        role="tabpanel"
      >
        <component :is="tab.component" :class="tab.class" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import OText from '@/components/atoms/OText.vue'

export default {
  components: {
    OText
  },
  props: {
    tabs: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      active_tab: 0
    }
  }
}
</script>

<style>
    .o-tab .v-slide-group__prev {
        display: none !important;
    }
    .o-tab .v-tabs-slider-wrapper, .o-tab .v-tabs-slider {
      overflow: hidden;
    }
</style>
