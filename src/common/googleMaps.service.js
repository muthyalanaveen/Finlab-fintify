/* global google */

import { CONSTANTS } from '@/constants'

const { CARRIERS } = CONSTANTS
const placeService = new google.maps.places.PlacesService(
  document.createElement('div')
)
const GOOGLE_MAP_API_CACHE = {}
const distanceService = new google.maps.DistanceMatrixService()
const geocoder = new google.maps.Geocoder()

const googleMapsService = {
  async getDistance (origin, destination) {
    return new Promise((resolve, reject) => {
      distanceService.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL
        },
        (response, status) => {
          if (status === 'OK') {
            const { originAddresses, destinationAddresses, rows } = response

            var originAddress = origin
            var destinationAddress = destination

            if (
              originAddresses?.length > 0 &&
              destinationAddresses?.length > 0
            ) {
              originAddress = originAddresses[0]
              destinationAddress = destinationAddresses[0]
            }

            var distance = '1 mi'
            var duration = '2 mins'

            if (
              rows?.length > 0 &&
              rows[0]?.elements?.length > 0 &&
              rows[0]?.elements[0]?.distance &&
              rows[0]?.elements[0]?.duration
            ) {
              distance = rows[0].elements[0].distance.text
              duration = rows[0].elements[0].duration.text
            }

            resolve({
              originAddress,
              destinationAddress,
              distance,
              duration
            })
          } else {
            reject(status)
          }
        }
      )
    })
  },

  async getDetails (placeId) {
    return new Promise((resolve, reject) => {
      placeService.getDetails(
        {
          placeId,
          fields: [
            'name',
            'opening_hours',
            'utc_offset_minutes',
            'formatted_phone_number',
            'formatted_address'
          ]
        },
        async function (place, status) {
          if (status === 'OK') {
            resolve(place)
          } else {
            reject(status)
          }
        }
      )
    })
  },

  async getLatLng (shippingAddress) {
    let lat
    let lng

    var latLng = GOOGLE_MAP_API_CACHE[shippingAddress]

    if (latLng) {
      return latLng
    }

    await geocoder.geocode({ address: shippingAddress }, function (
      results,
      status
    ) {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location
        lat = parseFloat(
          location
            .lat()
            .toString()
            .substr(0, 12)
        )
        lng = parseFloat(
          location
            .lng()
            .toString()
            .substr(0, 12)
        )
        GOOGLE_MAP_API_CACHE[shippingAddress] = { lat: lat, lng: lng }
      } else {
        console.error(
          'Geocode was not successful for the following reason: ' + status
        )
      }
    })
    return { lat: lat, lng: lng }
  },

  async getPlaces (shippingAddress, name, type, removeStore = false) {
    const { state, zip_code: zipCode, city } = shippingAddress
    let searchTerm = name

    if (
      !removeStore &&
      (type === 'in-store' ||
        name.toLowerCase() === CARRIERS.UPS ||
        name.toLowerCase() === CARRIERS.USPS)
    ) {
      searchTerm = `${name} Store`
    }
    return new Promise((resolve, reject) => {
      placeService.textSearch(
        {
          query: `"${searchTerm}" ${city} ${state} ${zipCode}`
        },
        async function (results, status) {
          if (status === 'OK') {
            resolve(results)
          } else {
            resolve([])
          }
        }
      )
    })
  }
}

export default googleMapsService
