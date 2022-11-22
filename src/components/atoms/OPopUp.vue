<template>
  <v-dialog
    v-model="visible"
    max-width="300"
  >
    <v-card class="pt-6 pb-6 pl-5 pr-5">
      <o-text xl style="text-align: center;">
        {{ title }}
      </o-text>
      <o-text
        med
        class="mt-4"
        style="text-align: center"
      >
        {{ message }}
      </o-text>
      <v-card-actions>
        <v-spacer />
        <action-button
          @click.stop="onClick"
          primary-color
          class="mt-4"
          style="align-self: center;"
          large
        >
          {{ buttonMessage }}
        </action-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import OText from '@/components/atoms/OText.vue'
import ActionButton from '@/components/atoms/ActionButton.vue'
export default {
  name: 'OPopUp',
  components: { OText, ActionButton },
  props: {
    onClick: {
      type: Function,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    buttonMessage: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    visible: {
      get () {
        return this.show
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
