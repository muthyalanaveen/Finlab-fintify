<template>
  <div
    :class="{
      'pa-0 mt-1 mb-16': $vuetify.breakpoint.smAndDown,
      'mt-0': $vuetify.breakpoint.mdAndUp,
    }"
  >
    <v-row :justify="HERO_DISABLED ? 'center' : 'space-between'">
      <hero-image
        v-if="!HERO_DISABLED"
        :class="{ 'mt-n2': $vuetify.breakpoint.mdAndUp }"
        :src="heroImage"
      />
      <v-col
        md="6"
        order-md="1"
        :class="{
          'd-flex align-center justify-center': $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-card
          :class="{
            'px-8': $vuetify.breakpoint.smAndDown,
            'py-4': $vuetify.breakpoint.smAndDown,
          }"
          flat
        >
          <v-form @keyup.enter="lookupOrder">
            <header-title>
              {{ this.RETURN_AND_TRACK_ORDERS }}
            </header-title>
            <o-text-field
              :title="ENTER_ORDER_ID"
              id="orderId"
              class="regularWt medium"
              @onChange="onChange($event)"
              @onKeyEnter="lookupOrder"
              @onPaste="onPaste($event)"
              :placeholder="ENTER_ORDER_ID_PLACEHOLDER"
            />
            <action-button
              @click.prevent="lookupOrder"
              class="mt-n2"
              primary-color
              :disabled="isDisabled"
              block
              aria-label="Go to Zip Code Entry Page"
              x-large
            >
              {{ NEXT }}
            </action-button>

            <div
              :class="{
                'mt-5': $vuetify.breakpoint.smAndDown,
                'mt-4': $vuetify.breakpoint.mdAndUp,
                'd-flex justify-content-between': this.isGiftAllowed,
                'd-flex justify-center': !this.isGiftAllowed,
              }"
            >
              <div>
                <action-button
                  @click.stop="onGiftReturnClick()"
                  tertiary-color
                  v-show="this.isGiftAllowed"
                  text
                >
                  {{ RETURN_A_GIFT }}
                </action-button>
              </div>
              <div>
                <action-button
                  @click.stop="toggleHowItWorks(true)"
                  tertiary-color
                  text
                  v-show="this.howItWorksEnabled"
                >
                  {{ HOW_IT_WORKS }}
                </action-button>
                <HowItWorksView
                  :visible="showHowItWorks"
                  @close="toggleHowItWorks(false)"
                />
              </div>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import HowItWorksView from '@/components/pages/HowItWorksView.vue'
import heroImage from 'branding/assets/images/hero.png'
import HeroImage from '@/components/molecules/HeroImage.vue'
import OTextField from '@/components/molecules/OTextField.vue'
import ActionButton from '@/components/atoms/ActionButton.vue'
import { validateOrderId } from '@/utils'
import { ORDER_LOOKUP, PAGE_TITLES } from 'branding/strings.json'
import { HERO_DISABLED, howItWorksEnabled } from 'branding/config.json'
import { GET_CONFIG } from '@/store/constants.js'
import HeaderTitle from '../molecules/HeaderTitle.vue'
import { setGiftEmail, setIsGift } from '@/store/sessionStorage.js'

export default {
  name: 'Home',
  components: {
    HowItWorksView,
    HeroImage,
    OTextField,
    ActionButton,
    HeaderTitle
  },
  data () {
    return {
      orderId: '',
      isDisabled: true,
      showHowItWorks: false,
      heroImage,
      RETURN_AND_TRACK_ORDERS: ORDER_LOOKUP.RETURN_AND_TRACK_ORDERS,
      ENTER_ORDER_ID: ORDER_LOOKUP.ENTER_ORDER_ID,
      ENTER_ORDER_ID_PLACEHOLDER: ORDER_LOOKUP.ENTER_ORDER_ID_PLACEHOLDER,
      RETURN_A_GIFT: ORDER_LOOKUP.RETURN_A_GIFT,
      HOW_IT_WORKS: ORDER_LOOKUP.HOW_IT_WORKS,
      NEXT: ORDER_LOOKUP.NEXT,
      HERO_DISABLED: HERO_DISABLED,
      isGiftAllowed: false,
      howItWorksEnabled: howItWorksEnabled
    }
  },
  mounted () {
    this.orderId = ''
    this.$store.commit('ui/updateOrderId', '')
    this.$store
      .dispatch('order/' + GET_CONFIG, null)
      .then((response) => {
        if (response) {
          this.isGiftAllowed = response?.gift_returns_allowed
        }
      })
      .catch((err) => {
        console.error({ err })
      })
  },
  methods: {
    validate (value) {
      this.orderId = value
      this.isDisabled = !validateOrderId(value)
    },
    toggleHowItWorks (opening) {
      if (opening) {
        this.showHowItWorks = true
        document.title = PAGE_TITLES.HOW_IT_WORKS
      } else {
        this.showHowItWorks = false
        document.title = PAGE_TITLES.ORDER_LOOKUP
      }
    },
    onChange (event) {
      this.validate(event.target.value)
    },
    onPaste (event) {
      this.validate(event.clipboardData.getData('text/plain'))
    },
    async lookupOrder () {
      this.$store.commit('ui/updateOrderId', this.orderId)
      this.$router.push('/zipcode')
      setIsGift(false)
      setGiftEmail('')
    },
    onGiftReturnClick () {
      setIsGift(true)
      if (validateOrderId(this.orderId)) {
        this.$store.commit('ui/updateOrderId', this.orderId)
        this.$router.push('/email')
      } else {
        this.$router.push('/order')
      }
    }
  }
}
</script>

<style scoped></style>
