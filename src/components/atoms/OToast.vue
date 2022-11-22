<template>
  <v-snackbar
    v-model="show"
    top
    elevation="24"
    v-bind="{...$props, ...$attrs}"
  >
    <div
      class="d-flex "
    >
      <div class=" mr-2">
        <v-icon style="color:#white" role="img">
          {{ leftIcon }}
        </v-icon>
      </div>
      <o-text
        sm
        semi-bold
        text-white
      >
        {{ title }}
      </o-text>
    </div>

    <template #action="{ attrs }">
      <v-btn
        color="white"
        icon
        v-bind="attrs"
        @click.stop="show=false"
        aria-label="close"
      >
        <CloseIcon />
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close.vue'
import OText from '@/components/atoms/OText.vue'

export default {
  name: 'OToast',
  components: {
    CloseIcon,
    OText
  },
  props: {
    leftIcon: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    timeout: {
      type: Number,
      required: false,
      default: 3000
    },
    visible: Boolean
  },
  data () {
    return {
      snackbar: this.active
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
</style>
