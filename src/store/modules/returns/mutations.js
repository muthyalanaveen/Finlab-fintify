import { PAGE_TITLES } from 'branding/strings.json'
import { DIALOG_CARRIER_INFORMATION } from '@/store/constants'

export default {
  updatePolicies (state, policies) {
    state.policies = policies
  },
  updateConfig (state, config) {
    state.config = config
  },
  updateStep (state, step) {
    state.step = step
  },
  resetIndex (state) {
    state.currentItemIndex = 0
  },
  incrementIndex (state) {
    state.currentItemIndex += 1
  },
  decrementIndex (state) {
    state.currentItemIndex -= 1
  },
  updateReason (state, { reason, sku }) {
    const returnReason = { ...reason }
    if (state.itemFeedback[sku]) {
      returnReason.return_reason_feedback = state.itemFeedback[sku]
    }
    state.reason = returnReason
  },
  updateReturnItemFeedback (state, { sku, feedback }) {
    state.itemFeedback[sku] = feedback
  },
  updateMethods (state, methods) {
    state.policies.return_methods = methods
  },
  openModal (state, payload) {
    state.isModalOpen = true
    state.activeModal = payload.type
    if (payload.type === DIALOG_CARRIER_INFORMATION) {
      document.title = PAGE_TITLES.LOCATION_DETAILS
    }
    state.disableModalGoBack = payload.disableModalGoBack || false
    if (payload.selectedCarrier) {
      state.selectedCarrier = payload.selectedCarrier
    }
  },
  closeModal (state) {
    state.isModalOpen = false
    state.activeModal = null
    if (window.location.href.includes('/shipping')) {
      document.title = PAGE_TITLES.RETURN_METHOD
    } else if (window.location.href.includes('/confirm')) {
      document.title = PAGE_TITLES.NEXT_STEPS
    } else if (window.location.href.includes('/tracker')) {
      document.title = PAGE_TITLES.TRACKER
    }
    state.selectedReturnMethodOption = {}
  },
  setSelectedCarrier (state, value) {
    state.selectedCarrier = value
  },
  setSelectedReturnMethod (state, value) {
    state.selectedReturnMethod = value
  },
  setAddress (state, value) {
    state.address = value
  },
  setLoading (state, value) {
    state.isLoading = value
  },
  setNearbyCarriers (state, value) {
    state.nearbyCarriers = value
  },
  updateSelectedReturnItem (state, returnitem) {
    state.selectedReturnItem = returnitem
  },
  updateReturnSelectedTab (state, index) {
    state.returnSelectedTab = index
  },
  updatePolicyReturnMethods (state, methods) {
    state.policies.policy_return_methods = methods
  },
  updateSelectedReturnMethodOption (state, methods) {
    state.selectedReturnMethodOption = methods
  }
}
