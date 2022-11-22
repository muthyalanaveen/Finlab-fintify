<template>
  <v-img
    v-bind="$attrs"
    v-on="$listeners"
    contain
  >
    <template #placeholder>
      <v-sheet>
        <v-skeleton-loader />
      </v-sheet>
    </template>
    <slot />
  </v-img>
</template>

<script>
export default {
  name: 'BaseImage'
}
</script>
