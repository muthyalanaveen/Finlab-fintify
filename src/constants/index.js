// A place matches if one of these terms matches its name exactly, see `utils/validStoreName()`
export const whiteListedStaplesStores = [
  'staples',
  'staples print & marketing services'
]

// A place matches if its name includes one of these terms, see `utils/validStoreName()`
export const whiteListedUSPSStores = [
  'united states postal service',
  'usps',
  'us post office'
]

export const CONSTANTS = Object.freeze({
  RETURN_METHODS: {
    MAIL_BACK: 'mail-back',
    EXPRESS_RETURNS: 'express-returns',
    DROP_OFF: 'drop-off',
    CUSTOMER_KEEP: 'customer_keep',
    IN_STORE: 'in-store'
  },
  BASE_LNG: -77.02652,
  BASE_LAT: 38.89873,
  UNKNOWN: 'unknown',
  RETURN_REASON_STEP: {
    ACTION: 'action',
    PRIMARY: 'primary'
  },
  RETURN_REASON_ACTION: {
    COLOR: 'color',
    SIZE: 'size',
    DAMAGED: 'damaged',
    OTHER: 'other',
    REFUND: 'refund'
  },
  CARRIERS: {
    USPS: 'usps',
    STAPLES: 'staples',
    UPS: 'ups',
    FEDEX: 'fedex'
  },
  ACTION_TYPE: {
    COLOR: 'color',
    SIZE: 'size'
  },
  RETURN_STATUS: {
    IN_TRANSIT: 'IN_TRANSIT',
    STARTED: 'STARTED',
    RECEIVED: 'RECEIVED',
    COMPLETED: 'COMPLETED',
    CANCELED: 'CANCELED'
  },
  RMA_STATUS: {
    READY_TO_REFUND: 'READY_TO_REFUND',
    REFUNDED: 'REFUNDED',
    PARTIAL_REFUNDED: 'PARTIAL_REFUNDED',
    REFUND_ERROR: 'REFUND_ERROR',
    CREATED: 'CREATED',
    CANCELED: 'CANCELED'
  },
  GOODS_STATUS: {
    CREATED: 'CREATED',
    ACCEPTED: 'ACCEPTED',
    RECEIVED: 'RECEIVED',
    PRE_TRANSIT: 'PRE_TRANSIT',
    TRANSIT: 'TRANSIT',
    UNKNOWN: 'UNKNOWN',
    DELIVERED: 'DELIVERED'
  },
  REVIEW_VIEW_RETURN_SUMMARY: {
    EXCHANGE_SUBTOTAL: 'exchange-subtotal',
    SHIPPING: 'shipping',
    SUBTOTAL: 'subtotal'
  },
  ERROR_CODES: {
    CREATE_RMA_EXCHANGE_ERROR: 422,
    FORBIDDEN: 403
  },
  POLICY_DEFAULTS: {
    REFUND_TIMING_DEFAULT: '5-7',
    MULTI_ITEM_EXCHANGE_ENABLED: false,
    MAP_ENABLED: false,
    DROP_OFF_WINDOW: 14,
    MULTI_LINE_SAME_ITEM_EXCHANGE_ENABLED: false
  },
  ORDER_DEFAULTS: {
    IS_FREE_SHIPPING: false,
    IS_EXCHANGE_ORDER: false,
    IS_TERRITORY_OR_MILITARY: false,
    IS_PO_BOX: false
  },
  EXCHANGE: 'exchange',
  REFUND: 'refund',
  IS_GIFT_VALUE: 'is_gift',
  GIFT_RETURN_EMAIL_VALUE: 'email',
  EXCHANGE_AND_REFUND: 'exchange_and_refund',
  API_VERSION: 'v1'
})
