/* eslint-disable promise/param-names */
import googleMapsService from '@/common/googleMaps.service'
import store from '../store'
import { CONSTANTS } from '@/constants/index.js'
import { getDistanceValue } from '@/utils'
import { returnShippingOptions } from '@/controllers/ReturnMethodsController.js'

export async function getNearbyStores (shippingOptions) {
  const shippingAddress = store.getters['returns/getAddress']
  const expressReturns = getExpressReturns(shippingOptions)

  if (!expressReturns) {
    throw new Error('No Express Returns Available')
  }

  await store.dispatch('returns/fetchNearbyCarriers', {
    carrier: expressReturns,
    shippingAddress: shippingAddress
  }) // puts nearby carriers in the store
}

// returns empty string if no express returns
export function getExpressReturns (shippingOptions) {
  return shippingOptions.find(
    (option) => option.type === CONSTANTS.RETURN_METHODS.EXPRESS_RETURNS
  )
}

export async function getShippingAddress () {
  const shippingAddress = store.getters['returns/formattedShippingAddress']
  const latLng = await googleMapsService.getLatLng(shippingAddress)

  const marker = {
    lat: latLng.lat,
    lng: latLng.lng
  }

  return { position: marker, address: shippingAddress }
}

export function checkMapsPolicy () {
  const policy = store.getters['returns/policies']
  const isTerritoryOrMilitary = store.getters['order/isTerritoryOrMilitary']
  const isPOBox = store.getters['order/isPOBox']

  const isValidMapsAddress = !isTerritoryOrMilitary && !isPOBox

  return (policy.feature_flags?.map_enabled && isValidMapsAddress) || true
}

export async function checkForExpressDropoffOptions (
  returnMethods,
  policyReturnMethods
) {
  let expressReturnsEnabled = false

  try {
    const policy = store.getters['returns/policies']

    expressReturnsEnabled = policy?.policy_return_methods?.find(
      (method) => method.type === CONSTANTS.RETURN_METHODS.EXPRESS_RETURNS
    )

    if (checkMapsPolicy() && expressReturnsEnabled) {
      const nearbyCarriers = await findAllExpressReturnLocations(
        returnMethods,
        policyReturnMethods,
        false // getting coords
      )
      expressReturnsEnabled = nearbyCarriers.placesToCoords.length > 0
    } else {
      expressReturnsEnabled = false
    }
  } catch (e) {
    console.error(e)
  }
  return expressReturnsEnabled
}

/**
 *
 * @param {*} gettingCoords
 * @returns placesToCoords
 */

export async function getDropoffLocations (gettingCoords) {
  const places = store.getters['returns/getNearbyCarriers']

  // if only checking if nearby carriers exist, dont get the coords
  if (!gettingCoords) {
    return places
  }
  const markers = []

  for (var i = 0; i < places.length; i++) {
    const latLng = await googleMapsService.getLatLng(
      places[i].formattedAddress
    )
    const marker = {
      lat: latLng.lat,
      lng: latLng.lng
    }
    markers.push({
      carrier: places[i],
      position: marker,
      distance:
        places[i].distance !== null ? places[i].distance : CONSTANTS.UNKNOWN,
      closingTime:
        places[i].openingHours.todayClosingTime !== null
          ? places[i].openingHours.todayClosingTime
          : CONSTANTS.UNKNOWN
    })
  }

  return markers
}

export async function findAllExpressReturnLocations (
  returnMethods,
  policyReturnMethods,
  gettingCoords
) {
  let shippingAddress

  if (gettingCoords) {
    // dont need shipping address coords for inital map check
    shippingAddress = await getShippingAddress()
  }

  let placesToCoords = []
  const shippingOptions = returnShippingOptions(
    returnMethods,
    policyReturnMethods
  )

  if (
    shippingOptions &&
    shippingOptions.length > 0 &&
    getExpressReturns(shippingOptions)
  ) {
    // correct shipping options available
    await getNearbyStores(shippingOptions)
    placesToCoords = await getDropoffLocations(gettingCoords)
  }
  return { shippingAddress: shippingAddress, placesToCoords: placesToCoords }
}

export function returnMethodsWithinDistance (hasMap) {
  let potentialReturnMethods = store.getters['returns/returnMethods']
  const isTerritoryOrMilitary = store.getters['order/isTerritoryOrMilitary']
  const isPOBox = store.getters['order/isPOBox']
  const useMailInnovations = store.getters['returns/policies']?.use_mail_innovations

  if (hasMap) {
    potentialReturnMethods = potentialReturnMethods.filter(
      (method) => method.type !== CONSTANTS.RETURN_METHODS.EXPRESS_RETURNS
    )
  }
  if (isTerritoryOrMilitary || isPOBox) {
    potentialReturnMethods = potentialReturnMethods.filter(
      (method) => method?.type !== CONSTANTS.RETURN_METHODS.MAIL_BACK ||
      method?.shipping_classes?.includes('innovations')
    )
  }
  // check if only mailback affiliate is innovations, if so, do not filter out
  const mailbackAffliateCount = potentialReturnMethods?.filter((method) => method?.type === 'mail-back').length
  if (!useMailInnovations && mailbackAffliateCount > 1) {
    potentialReturnMethods = potentialReturnMethods.filter((method) => !method?.shipping_classes?.includes('innovations'))
  }
  return potentialReturnMethods?.slice()
    .sort(
      (method1, method2) =>
        method1.returnMethodRank - method2.returnMethodRank ||
        getDistanceValue(method1?.distance) -
          getDistanceValue(method2?.distance)
    )
}

export function setSelectedReturnMethod (carrier) {
  store.commit('returns/setSelectedReturnMethod', carrier)
}
