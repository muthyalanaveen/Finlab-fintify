import store from '@/store'
import { whiteListedStaplesStores, whiteListedUSPSStores, CONSTANTS } from '@/constants'
import { RETURN_METHOD_SCREENS } from 'branding/strings.json'

const { RETURN_METHODS, CARRIERS } = CONSTANTS

export function isExchangeOrder (exchangeList) {
  return exchangeList.length !== 0
}

export function isUSPSCarrier (selectedCarrier) {
  return selectedCarrier?.customer_facing_carrier?.toLowerCase() === CARRIERS.USPS
}

export function isMailBackReturn (carrier) {
  return carrier?.type?.toLowerCase() === RETURN_METHODS.MAIL_BACK
}

export function getReturnsHelperText (returnType) {
  var desc = ''

  if (
    returnType.type === RETURN_METHODS.IN_STORE ||
    returnType.type === RETURN_METHODS.EXPRESS_RETURNS
  ) {
    desc = RETURN_METHOD_SCREENS.DROP_OFF_AT + ' '
  } else if (returnType.type === RETURN_METHODS.MAIL_BACK) {
    desc = RETURN_METHOD_SCREENS.MAIL_BACK_VIA + ' '
  }
  return desc
}

export function getSelectedReturnMethodDropOffDescription (returnType) {
  var desc = getReturnsHelperText(returnType)
  desc = desc + returnType.customer_facing_carrier

  return desc
}

export function getShippingAmt (carrier) {
  let amt = ''
  const isFreeShipping = store.getters['order/isFreeShipping']

  if (carrier?.free_shipping || isFreeShipping || isRMAFreeShipping()) {
    amt = RETURN_METHOD_SCREENS.FREE
  } else {
    amt = (carrier?.flat_fee?.amount / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  }
  return amt
}

export function returnShippingOptions (
  returnMethods,
  policyReturnMethods,
  fromReturnMethods = undefined
) {
  var updatedReturnMethods = fromReturnMethods
    ? returnMethods
    : formatReturnMethods(policyReturnMethods)
  return updatedReturnMethods.map((r) => {
    const action = getReturnsHelperText(r?.customer_facing_carrier)
    const price = getShippingAmt(r)

    return {
      id: r.id,
      name: r.customer_facing_carrier,
      address: null,
      action,
      isOpen: true,
      closingTime: null,
      distance: null,
      price,
      ...r
    }
  })
}

export function formatReturnMethods (returnMethods) {
  const methods = []
  returnMethods.forEach((method) => {
    const type = method.type
    const requirePackageAndPrint = method.package_and_print
    const isSustainable = method.sustainable
    const returnMethodRank = method.return_method_rank
    const distanceThreshold = method.distance_threshold

    method.affiliates.map((affiliate) => {
      methods.push({
        id: `${type}_${affiliate.customer_facing_carrier}`,
        type,
        requirePackageAndPrint,
        isSustainable,
        returnMethodRank,
        distanceThreshold,
        ...affiliate
      })
    })
  })
  return methods
}

export function validStoreName (storeName, storeType) {
  const returnMethods = store.getters['returns/policyReturnMethods']
  // format returnMethods if not already formatted
  const formattedReturnMethods =
    returnMethods.length && returnMethods[0].affiliates
      ? formatReturnMethods(returnMethods)
      : returnMethods
  const groupedReturnMethods = formattedReturnMethods.reduce(function (
    storage,
    item
  ) {
    var group = item.type
    storage[group] = storage[group] || []
    storage[group].push(item)
    return storage
  },
  {}) // group by type

  const storeNamesArr =
    groupedReturnMethods[storeType] &&
    groupedReturnMethods[storeType].map((type) =>
      type?.customer_facing_carrier.toLowerCase()
    )
  if (storeNamesArr) {
    return storeNamesArr.some((name) => {
      var found = false
      if (name === CARRIERS.STAPLES) {
        found = whiteListedStaplesStores.some(
          (store) => store === storeName.toLowerCase()
        )
      } else if (name === CARRIERS.USPS) {
        found = whiteListedUSPSStores.some((store) => {
          return storeName.toLowerCase().includes(store)
        })
      } else {
        found = storeName.toLowerCase().includes(name)
      }
      return found
    })
  }
  return true
}

export function isRMAFreeShipping () {
  // Check if the RMA is eligible for free shipping based on return reasons chosen and item level tags
  const refundList = store.getters['order/refundList']
  const exchangeList = store.getters['order/exchangeList']
  const totalList = refundList.concat(exchangeList)
  for (var i = 0; i < totalList.length; i++) {
    const exemptShipping = totalList[i].reason?.exempt_shipping ? totalList[i].reason.exempt_shipping : false
    const freeShippingItemTag = totalList[i].is_free_shipping ? totalList[i].is_free_shipping : false
    if (exemptShipping === true || freeShippingItemTag === true) {
      return true
    }
  }
  return false
}
