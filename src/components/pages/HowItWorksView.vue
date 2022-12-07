<template>
  <o-dialog
    :visible="show"
    is-full-screen
    @close="show = false"
  >
    <div style="max-width: 664px; margin: auto;">
      <v-form :class="{ 'px-2': $vuetify.breakpoint.mdAndUp }">
        <div class="d-flex justify-content-between align-center mt-16">
          <header-title>
            {{ HOW_IT_WORKS }}
          </header-title>

          <v-btn
            icon
            style="background-color: #ffffff; color: #000000;"
            @click.stop="show=false"
          >
            <CloseIcon />
          </v-btn>
        </div>

        <div class="d-flex align-start mt-4">
          <o-text> Forgot username or password</o-text>
           
        </div>

      </v-form>
    </div>
  </o-dialog>
</template>

<script>
import { HOW_IT_WORKS } from 'branding/strings.json'
import ODialog from '@/components/atoms/ODialog.vue'
import OText from '@/components/atoms/OText.vue'
import HeaderTitle from '@/components/molecules/HeaderTitle.vue'
import { mapGetters } from 'vuex'
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default {
  props: {
    visible: Boolean
  },
  components: {
    ODialog,
    OText,
    HeaderTitle,
    CloseIcon
  },
  data () {
    return {
      HOW_IT_WORKS: HOW_IT_WORKS.HOW_IT_WORKS,
    }
  },
  mounted () {
  },
  beforeUpdate () {
    
  },
  computed: {
    ...mapGetters({
    }),
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
</style>
