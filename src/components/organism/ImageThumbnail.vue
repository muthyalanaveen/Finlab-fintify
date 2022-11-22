<template>
  <v-card
    class="d-flex"
    :class="{
      'align-center': this.$attrs.isCustomerKeeps
    }"
    style="background-color: transparent"
    flat
    tile
  >
    <div
      class="image-wrapper"
      :class="{
        'image-wrapper-large': $vuetify.breakpoint.mdAndUp,
        'customer-keeps': this.$attrs.isCustomerKeeps
      }"
      :style="{
        'background-image': `url(${
          isValidImage() ? imageUrl : require('@/assets/images/placeholder.png')
        })`,
        'width': `${imageSize}`,
        'height': `${imageSize}`
      }"
    >
      <v-img
        v-if="this.productThumbnail"
        class="logo"
        :src="determineLogoPath"
        :position="'left'"
        :class="{
          'logo-small mb-1': $vuetify.breakpoint.smAndDown || this.isSmallThumbnail,
          'logo-medium ml-5 mb-1': $vuetify.breakpoint.mdOnly && !this.isSmallThumbnail,
          'logo-large ml-8 mb-2': $vuetify.breakpoint.lgAndUp && !this.isSmallThumbnail,
        }"
        :alt="'Image of ' + title"
        contain
      />
    </div>
    <v-col
      class="py-0 mr-n2"
      :class="{
        'ml-2': $vuetify.breakpoint.smOnly,
        'mt-0': $vuetify.breakpoint.smAndDown,
        'ml-6 mt-n1 ': $vuetify.breakpoint.mdOnly,
        'ml-14 mt-n1 ': $vuetify.breakpoint.lgAndUp && !this.isSmallThumbnail,
      }"
    >
      <o-text
        bold
        class="text-wrap"
        :lg="$vuetify.breakpoint.mdAndUp && !this.isSmallThumbnail"
        :base="$vuetify.breakpoint.smAndDown || this.isSmallThumbnail"
        :class="{
          'mt-0': $vuetify.breakpoint.smAndDown || this.isSmallThumbnail,
          'mt-2':
            $vuetify.breakpoint.mdAndUp && !this.isSmallThumbnail,
        }"
      >
        {{ title }}
      </o-text>
      <o-text
        class="mt-1 text-wrap regularWt"
        sm
        semi-bold
      >
        {{ subTitle1 }}
      </o-text>
      <div class="d-flex">
        <o-text
          v-if="item && subTitle2"
          class="mr-2 regularWt"
          sm
          semi-bold
        >
          {{ subTitle2 }}
        </o-text>
        <!--
        <o-text
          sm
          v-if="item && !item.is_eligible && item.quantity > 1"
        >
          ({{ item.quantity }} x ${{
            (item.unit_price_amount_cents / 100).toFixed(2)
          }})
        </o-text>
        -->
      </div>
      <div>
        <o-text
          v-if="item && subTitle3"
          class="mr-2 regularWt"
          sm
          semi-bold
        >
          {{ subTitle3 }}
        </o-text>
      </div>
      <div>
        <o-text
          v-if="item && subTitle4"
          class="mr-2 regularWt"
          sm
          semi-bold
        >
          {{ subTitle4 }}
        </o-text>
      </div>
      <o-select
        v-if="
          item &&
            item.original_quantity &&
            !item.isSingleQuantity &&
            this.showSelect &&
            item.is_eligible
        "
        class="ma-0 mt-5 mb-n6"
        :items="items"
        :item-text="(x) => x.quantity + ' of ' + items.length"
        style="width: 120px"
        @click.native.stop="ignoreEvent"
        @change="onChange"
        :disabled="item.is_returned"
        :default-value="items[item.quantity - 1]"
        aria-label="Number of items to return"
      />
      <o-text
        @click="() => (this.showReturnPolicyModal = true)"
        sm
        text-blue
        class="mt-2 clickable"
        v-show="
          !fromReturnItem && item && !item.is_eligible && !item.is_returned
        "
      >
        {{ WHY_CANT_RETURN }}
      </o-text>
      <o-dialog
        :visible="showReturnPolicyModal"
        is-full-screen
      >
        <div style="max-width: 664px; margin: auto;">
          <v-form :class="{ 'px-2': $vuetify.breakpoint.mdAndUp }">
            <div class="d-flex justify-content-between align-center mt-16">
              <header-title>
                {{ ITEM_RETURN_POLICY_TITLE }}
              </header-title>

              <v-btn
                icon
                style="background-color: #ffffff; color: #000000;"
                @click.stop="showReturnPolicyModal = false"
              >
                <CloseIcon />
              </v-btn>
            </div>
            <o-text v-html="this.ITEM_RETURN_POLICY_DESC" class="mt-8" />
          </v-form>
        </div>
      </o-dialog>
    </v-col>
  </v-card>
</template>

<script>
import OSelect from '@/components/atoms/OSelect.vue'
import ODialog from '@/components/atoms/ODialog.vue'
import { UPDATE_SELECTED_ITEM_QUANTITY } from '@/store/constants.js'
import { mapGetters } from 'vuex'
import { getFormattedDate, formatTags } from '@/utils'
import OText from '@/components/atoms/OText.vue'
import { ORDER_DISPLAY } from 'branding/strings.json'
import HeaderTitle from '@/components/molecules/HeaderTitle.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default {
  name: 'ImageThumbnail',
  components: {
    OSelect,
    ODialog,
    OText,
    HeaderTitle,
    CloseIcon
  },
  data () {
    return {
      ITEM_RETURN_POLICY_TITLE: ORDER_DISPLAY.ITEM_RETURN_POLICY_TITLE,
      ITEM_RETURN_POLICY_DESC: ORDER_DISPLAY.ITEM_RETURN_POLICY_DESC,
      WHY_CANT_RETURN: ORDER_DISPLAY.WHY_CANT_RETURN,
      showReturnPolicyModal: false,
      items: Array.from({ length: this.item?.original_quantity }, (_, i) => {
        return { quantity: i + 1 }
      })
    }
  },
  props: {
    item: {
      type: Object,
      required: false,
      default: null
    },
    orderBrand: {
      type: String,
      required: false,
      default: ''
    },
    productThumbnail: {
      type: Boolean,
      default: false
    },
    isSmallThumbnail: {
      type: Boolean,
      default: false
    },
    showSelect: {
      type: Boolean,
      default: false
    },
    showNoteMessage: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    subTitle1: {
      type: String,
      required: false,
      default: ''
    },
    subTitle2: {
      type: String,
      required: false,
      default: ''
    },
    subTitle3: {
      type: String,
      required: false,
      default: ''
    },
    subTitle4: {
      type: String,
      required: false,
      default: ''
    },
    imageUrl: {
      type: String,
      required: false,
      default: ''
    },
    fromReturnItem: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ignoreEvent (e) {
      e.stopPropagation()
    },
    onChange (a) {
      this.$store.commit('order/' + UPDATE_SELECTED_ITEM_QUANTITY, {
        identifier: this.item.identifier,
        quantity: a.quantity
      })
    },
    isValidImage () {
      return this.imageUrl
    },
    iconOverrideIcon () {
      return formatTags(this.item)['icon-override']
    }
  },
  computed: {
    ...mapGetters({ returnWindowDays: 'returns/returnWindowDays', policies: 'returns/policies' }),
    breakpointImageSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return '72px'
        case 'sm':
          return '72px'
        case 'md':
          return '128px'
        case 'lg':
          return '192px'
        case 'xl':
          return '192px'
        default:
          return '72px'
      }
    },
    imageSize () {
      if (this.isSmallThumbnail) {
        return '72px'
      }
      return this.breakpointImageSize
    },
    formattedDate () {
      return getFormattedDate(this.item.shipped_date)
    },
    determineLogoPath () {
      // check if concept logo is allowed by policy
      if (!this.policies.concept_logo_allowed) {
        return ''
      }
      // get override icon name if available
      return ''

    }
  }
}
</script>
<style scoped>
.v-select {
  width: 120px;
}
.clickable {
  cursor: pointer;
}
.maxWidth {
  width: 180px;
}
.wrapper {
  word-wrap: break-word;
}
.customer-keeps{
  transform: scale(0.5)
}
.image-wrapper {
  background-size: contain !important;
  background-position: center !important;
  background-color: transparent !important;
  display: flex;
  flex-shrink: 0 !important
}
.image-wrapper-large {
  background-position: center !important;
}
.logo {
  background-position: left !important;
  z-index: 1 !important;
  margin-top: auto !important;
}
.logo-small {
  margin-left: 12px;
  min-width: 30px;
  max-width: 30px;
  max-height: 17.5px;
  min-height: 10px;
}
.logo-medium {
  min-width: 50px;
  max-width: 50px;
  max-height: 28px;
  min-height: 17px;
}
.logo-large {
  min-width: 60px;
  max-width: 60px;
  max-height: 35px;
  min-height: 20px;
}
</style>
