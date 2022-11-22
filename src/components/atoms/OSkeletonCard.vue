<template>
  <v-row class="mb-6" no-gutters>
    <v-col :cols="$vuetify.breakpoint.smAndDown ? 2 : 3" v-if="showImage">
      <v-skeleton-loader
        type="image"
        :height="$vuetify.breakpoint.smAndDown ? 100 : 150"
      />
    </v-col>
    <v-col :cols="showImage? $vuetify.breakpoint.smAndDown ? 9 : 8 : 11">
      <v-skeleton-loader type="list-item-three-line" />
    </v-col>
    <v-col cols="1">
      <v-skeleton-loader type="button" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'OSkeletonCard',
  props: {
    showImage: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
}
</script>

<style scoped></style>
