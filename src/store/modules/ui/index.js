const state = {
  orderId: '',
  zipCode: '',
  email: '',
  isStickyButtonVisible: false,
  isGiftReturn: false,
  destinationResponse: '',
  rmaCreatedAt: ''
}

const getters = {
  orderId (state) {
    return state.orderId
  },
  zipCode (state) {
    return state.zipCode
  },
  email (state) {
    return state.email
  },
  isStickyButtonVisible (state) {
    return state.isStickyButtonVisible
  },
  rmaCreatedAt (state) {
    return state.rmaCreatedAt
  },
  isGiftReturn (state) {
    return state.isGiftReturn
  },
  destinationResponse (state) {
    return state.destinationResponse
  }
}

const mutations = {
  updateOrderId (state, orderId) {
    state.orderId = orderId
  },
  updateZipCode (state, zipCode) {
    state.zipCode = zipCode
  },
  updateEmail (state, email) {
    state.email = email
  },
  updateIsStickyButtonVisible (state, flag) {
    state.isStickyButtonVisible = flag
  },
  updateRmaCreatedAt (state, createdAt) {
    state.rmaCreatedAt = createdAt
  },
  updateIsGiftReturn (state, flag) {
    state.isGiftReturn = flag
  },
  updateDestinationResponse (state, destinationResponse) {
    state.destinationResponse = destinationResponse
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
