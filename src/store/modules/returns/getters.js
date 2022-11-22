import { CONSTANTS } from '@/constants'
export default {
  policies (state) {
    return state.policies
  },
  config (state) {
    return state.config
  },
  returnMethods (state) {
    return state.policies?.return_methods
  },
  policyReturnMethods (state) {
    return state.policies.policy_return_methods
  },
  reasons (state) {
    return state.policies?.return_reasons
  },
  returnWindowDays (state) {
    return state.policies.return_window_days
  },
  returnIsMapEnabled (state) {
    return state.policies?.feature_flags.map_enabled
  },
  returnIsMultiItemExchangeEnabled (state) {
    return state.policies?.feature_flags?.multi_item_exchanges_enabled || CONSTANTS.POLICY_DEFAULTS.MULTI_ITEM_EXCHANGE_ENABLED
  },
  returnIsMultiLineSameItemExchangeEnabled (state) {
    return state.policies?.feature_flags?.multi_line_same_item_exchanges_enabled || CONSTANTS.POLICY_DEFAULTS.MULTI_LINE_SAME_ITEM_EXCHANGE_ENABLED
  },
  returnRefundTimingEstimate (state) {
    return state.policies?.refund_timing_estimate || CONSTANTS.POLICY_DEFAULTS.REFUND_TIMING_DEFAULT
  },
  returnDropOffWindow (state) {
    return state.policies?.drop_off_window_days || CONSTANTS.POLICY_DEFAULTS.DROP_OFF_WINDOW
  },
  step (state) {
    return state.step
  },
  currentItemIndex (state) {
    return state.currentItemIndex
  },
  reason (state) {
    return state.reason
  },
  feedbackReason (state) {
    return state.feedbackReason
  },
  getActiveModal (state) {
    return state.activeModal
  },
  getIsModalOpen (state) {
    return state.isModalOpen
  },
  getSelectedCarrier (state) {
    return state.selectedCarrier
  },
  getSelectedReturnMethod (state) {
    return state.selectedReturnMethod
  },
  getAddress (state) {
    return state.address
  },
  formattedShippingAddress (localState) {
    const {
      street1 = '',
      city = '',
      state = '',
      country_code: countryCode = '',
      zip_code: zipCode = ''
    } = localState.address
    return `${street1}, ${city}, ${state}, ${countryCode}, ${zipCode}`
  },
  getIsLoading (state) {
    return state.isLoading
  },
  getNearbyCarriers (state) {
    return state.nearbyCarriers
  },
  getSelectedReturnItem (state) {
    return state.selectedReturnItem
  },
  getReturnSelectedTab (state) {
    return state.returnSelectedTab
  },
  getDisableModalGoBack (state) {
    return state.disableModalGoBack
  },
  getSelectedReturnMethodOption (state) {
    return state.selectedReturnMethodOption
  }
}
