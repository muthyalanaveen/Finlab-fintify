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
              Login and password
            </header-title>
            <o-text-field
              title="Enter username"
              id="orderId"
              class="regularWt medium"
              @onChange="onChange($event)"
              @onKeyEnter="lookupOrder"
              @onPaste="onPaste($event)"
              placeholder="Enter username"
            />
            <o-text-field
              title="Enter password"
              id="orderId"
              class="regularWt medium"
              @onChange="onChange($event)"
              @onKeyEnter="lookupOrder"
              @onPaste="onPaste($event)"
              placeholder="Enter password"
            />
            <action-button
              @click.prevent="lookupOrder"
              class="mt-n2"
              primary-color
              :disabled="isDisabled"
              block
              x-large
            >
              Submit
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
                  Forgot username or password
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
import { HERO_DISABLED } from 'branding/config.json'
import HeaderTitle from '../molecules/HeaderTitle.vue'

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
      isDisabled: true,
      showHowItWorks: false,
      heroImage,
      HERO_DISABLED: HERO_DISABLED
    }
  },
  mounted () {
  },
  methods: {
    validate () {
      this.isDisabled = false
    },
    onChange (event) {
      this.validate(event.target.value)
    },
    onPaste (event) {
      this.validate(event.clipboardData.getData('text/plain'))
    },
    async lookupOrder () {
      this.$router.push('/Landing')
    }
  }
}
</script>

<style scoped></style>
