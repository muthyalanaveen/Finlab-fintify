import { CONSTANTS } from '@/constants/index.js'
import store from '@/store'

export function isExchangeOrRefundRMAItems () {
  const { rmaOrderItems } = getFieldsFromStore()

  const isExchange = isExchangeOrder(rmaOrderItems)

  const isRefund = isRefundOrder(rmaOrderItems)

  if (isExchange && isRefund) {
    return CONSTANTS.EXCHANGE_AND_REFUND
  } else if (isExchange && !isRefund) {
    return CONSTANTS.EXCHANGE
  }

  return CONSTANTS.REFUND
}

export function isExchangeOrRefundOrderItems () {
  const { refundList, exchangeList } = getFieldsFromStore()

  const isExchange =
    exchangeList && exchangeList?.length > 0
  const isRefund =
    refundList && refundList?.length > 0
  if (isExchange && isRefund) {
    return CONSTANTS.EXCHANGE_AND_REFUND
  } else if (isExchange && !isRefund) {
    return CONSTANTS.EXCHANGE
  }
  return CONSTANTS.REFUND
}

export function isExchangeOrder (rmaItems) {
  return rmaItems?.find(
    (item) => item.is_exchange === true
  )
}

export function isRefundOrder (rmaItems) {
  return rmaItems?.find(
    (item) => item.is_exchange === false
  )
}

export function isExchangeAndRefundOrder (rmaItems) {
  return this.isExchangeOrder(rmaItems) && this.isRefundOrder(rmaItems)
}

export function isOnlyExchangeOrder (rmaItems) {
  var isExchange = true
  rmaItems.find((rmaItem) => {
    if (!rmaItem?.is_exchange) {
      isExchange = false
    }
  })
  return isExchange
}

const getFieldsFromStore = () => {
  const refundList = store.getters['order/refundList']
  const exchangeList = store.getters['order/exchangeList']
  const getSelectedReturnItem = store.getters['returns/getSelectedReturnItem']
  const rmaOrderItems = getSelectedReturnItem?.rma_items

  return {
    refundList,
    exchangeList,
    rmaOrderItems
  }
}
