import { CONSTANTS } from '@/constants'

export default {
  policies: null,
  config: null,
  activeModal: null,
  isModalOpen: false,
  selectedCarrier: null,
  selectedReturnMethod: {},
  address: {
    city: '',
    name: '',
    phone: '',
    state: '',
    street1: '',
    zip_code: '',
    country_code: '',
    latitude: null,
    longitude: null
  },
  nearbyCarriers: [],
  isLoading: false,
  step: CONSTANTS.RETURN_REASON_STEP.PRIMARY,
  currentItemIndex: 0,
  reason: '',
  feedbackReason: '',
  selectedReturnItem: {},
  returnSelectedTab: 0,
  disableModalGoBack: false,
  itemFeedback: {},
  selectedReturnMethodOption: {}
}
