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
          <o-text
            v-html="STEP_4"
          />
        </div>

        <div class="d-flex align-start mt-4">
          <o-text>
            {{ STEP_2 }}
          </o-text>
        </div>

        <!-- <div class="d-flex align-start mt-4">
          <o-text class="ml-8">
            {{ STEP_3 }}
          </o-text>
        </div> -->

        <div v-if="exchangesAllowed" class="d-flex align-start mt-4">
          <o-text>
            {{ STEP_1 }}
          </o-text>
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
import { GET_CONFIG } from '@/store/constants.js'
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
      EASY: HOW_IT_WORKS.EASY,
      FAST_AND_FREE: HOW_IT_WORKS.FAST_AND_FREE,
      CONVENIENT: HOW_IT_WORKS.CONVENIENT,
      STEP_1: HOW_IT_WORKS.HOW_IT_WORKS_STEP_1,
      STEP_2: HOW_IT_WORKS.HOW_IT_WORKS_STEP_2,
      STEP_3: HOW_IT_WORKS.HOW_IT_WORKS_STEP_3,
      STEP_4: HOW_IT_WORKS.HOW_IT_WORKS_STEP_4,
      exchangesAllowed: false
    }
  },
  mounted () {
    this.orderId = ''
  },
  beforeUpdate () {
    var refundTimingEstimate = this.returnRefundTimingEstimate
    if (!this.config) {
      this.$store
        .dispatch('order/' + GET_CONFIG, null)
        .then((response) => {
          if (response) {
            this.exchangesAllowed = response.exchanges_allowed
            this.refundTimingEstimate = response.refund_timing_estimate
          }
        })
        .catch((err) => {
          console.error({ err })
        })
    } else {
      this.exchangesAllowed = this.config?.exchanges_allowed
    }
    this.STEP_2 = HOW_IT_WORKS.HOW_IT_WORKS_STEP_2.replace('$$refundTimingEstimate', refundTimingEstimate)
  },
  computed: {
    ...mapGetters({
      config: 'returns/config',
      returnRefundTimingEstimate: 'returns/returnRefundTimingEstimate'
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
