<template>
  <v-dialog
    v-model="show"
    persistent
    :fullscreen="$vuetify.breakpoint.smAndDown || isFullScreen"
    transition="dialog-bottom-transition"
    :max-width="width"
    content-class="elevation-0"
    :retain-focus="false"
  >
    <v-card>
      <v-card-text>
        <v-row
          class="d-flex justify-center"
          :class="{'mt-n2': $vuetify.breakpoint.smAndDown, 'mt-0 mb-6': $vuetify.breakpoint.mdAndUp}"
        >
          <slot />
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'ODialog',
  components: {
  },
  mounted () {
    const dialogs = document.getElementsByClassName('v-dialog__content--active')
    for (var dialog of dialogs) {
      dialog.setAttribute('role', 'dialog')
      dialog.setAttribute('aria-label', document.title)
    }
  },
  props: {
    visible: Boolean,
    isFullScreen: Boolean,
    width: {
      type: [String, Number],
      required: false,
      default: 'auto'
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>

<style scoped>
  .container {
    padding-top: 60px;
  }
  .v-dialog {
    border-radius: 0px !important;
  }
  .v-card {
    border-radius: 0px !important;
  }
</style>
