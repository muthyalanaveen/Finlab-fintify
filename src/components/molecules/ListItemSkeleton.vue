<template>
  <div>
    <div
      v-for="(_, index) in this.list"
      :key="index"
      class="tile"
    >
      <v-divider class="my-0" />
      <v-list-item class="d-flex align-center tile ">
        <v-skeleton-loader type="list-item" style="width:100%; background: #e1e6fa;" />
        <v-icon
          color="#B7B7B7"
          class="ml-auto d-flex align-end"
          :class="{
            'mr-2': $vuetify.breakpoint.smAndDown,
            'mr-n1': $vuetify.breakpoint.mdAndUp,
          }"
          size="20"
          role="img"
        >
          mdi-chevron-right
        </v-icon>
      </v-list-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListItemSkeleton',
  components: {
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClickMethod (event) {
      this.$emit('onClick', event)
    }
  },
  computed: {
  }
}
</script>

<style scoped>
.tile {
  display: block;
  cursor: pointer;
  min-height: 64px;
}
.tile:hover,
.v-list-item--link:before {
  background: #f2f5ff;
}
.tile:active {
  background: #e1e6fa;
}
</style>
