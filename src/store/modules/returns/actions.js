import googleMapsService from '@/common/googleMaps.service'
import { toRegularTime, isStoreWithinDistance, getLookupKeys, dayOfWeekAsString } from '@/utils'
import store from '@/store'
import { validStoreName } from '@/controllers/ReturnMethodsController.js'
import { checkMapsPolicy } from '@/controllers/MapController.js'
import { CONSTANTS } from '@/constants/index.js'

// in HHMM format
const formattedTime = (hours, minutes) => {
  return parseInt(`${hours}${minutes < 10 ? '0' + minutes : minutes}`)
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
const GOOGLE_MAP_API_CACHE = {}
const GOOGLE_MAP_API_PID_CACHE = {}

const getWeeklyRange = (place) => {
  const formattedWeeklyRange = { dateRange: '', timeRange: '' }

  const weeklyRange = place?.opening_hours?.periods?.reduce((acc, day) => {
    // if earliest found open day, set as start
    if (day?.open?.day <= acc?.dateRange?.start) {
      acc.dateRange.start = day?.open?.day
    }
    // if latest found open day, set as end
    if (day?.open?.day >= acc?.dateRange?.end) {
      acc.dateRange.end = day?.open?.day
    }
    // check if current day open is later than stored
    if (day?.open?.hours >= acc?.timeRange?.startHour) {
      if (day?.open?.minutes >= acc?.timeRange?.startMinute) {
        acc.timeRange.startMinute = day?.open?.minutes
      }
      acc.timeRange.startHour = day?.open?.hours
    }
    // check if current day close is earlier than stored
    if (day?.close?.hours <= acc?.timeRange?.endHour || !acc?.timeRange?.endHour) {
      if (day?.close?.minutes <= acc?.timeRange?.endMinute || !acc?.timeRange?.endMinute) {
        acc.timeRange.endMinute = day?.open?.minutes
      }
      acc.timeRange.endHour = day?.close?.hours
    }
    return acc
  }, { dateRange: { start: '', end: '' }, timeRange: { startHour: '', startMinute: '', endHour: '', endMinute: '' } })

  // reformat for human-readable
  formattedWeeklyRange.dateRange = `${dayOfWeekAsString([weeklyRange?.dateRange?.start === 0 ? 1 : weeklyRange?.dateRange?.start]).slice(0, 3)} - ${dayOfWeekAsString([weeklyRange?.dateRange?.end]).slice(0, 3)}`

  formattedWeeklyRange.timeRange = `${toRegularTime({ dayIndex: '', hours: weeklyRange?.timeRange?.startHour, minutes: weeklyRange?.timeRange?.startMinute })}
  - ${toRegularTime({ hours: weeklyRange?.timeRange?.endHour, minutes: weeklyRange?.timeRange?.endMinute || 0 })}`

  return formattedWeeklyRange
}

const getFormattedStoreTime = (place) => {
  let closingHours = null
  let openingHours = null
  let openingMinutes = null
  let closingMinutes = null
  let dayIndex = ''

  const currentDay = new Date().getDay()
  const currentTime = formattedTime(new Date().getHours(), new Date().getMinutes())
  const todaysPeriodArr = place.opening_hours?.periods?.filter(
    (reqdDay) => reqdDay?.close?.day === currentDay
  )
  // todaysPeriod array can be of any length

  if (todaysPeriodArr) {
    if (!todaysPeriodArr.length) { // holiday
      for (let day = (currentDay + 1) % 7, count = 0; count < 6; day = (day + 1) % 7, count++) {
        const dayPeriodArr = place.opening_hours?.periods?.filter(
          (reqdDay) => reqdDay?.close?.day === day
        )
        if (!dayPeriodArr.length) {
          continue
        } else {
          dayIndex = Math.abs(day - currentDay) > 1 ? day : '' // show day of the week only when its not the next day
          openingHours = dayPeriodArr[0]?.open?.hours
          openingMinutes = dayPeriodArr[0]?.open?.minutes
          break
        }
      }
    } else if (todaysPeriodArr.length === 1) {
    // only one closing and opening time for a day
      closingHours = todaysPeriodArr[0]?.close?.hours
      closingMinutes = todaysPeriodArr[0]?.close?.minutes
      openingHours = todaysPeriodArr[0]?.open?.hours
      openingMinutes = todaysPeriodArr[0]?.open?.minutes
    } else {
    // store open in breaks in a day
      for (let index = 0; index < todaysPeriodArr.length; index++) {
        if (currentTime < formattedTime(todaysPeriodArr[index]?.open?.hours, todaysPeriodArr[index]?.open?.minutes
        ) // closed: before store opening
        ) {
          openingHours = todaysPeriodArr[index]?.open?.hours
          openingMinutes = todaysPeriodArr[index]?.open?.minutes
          closingHours = todaysPeriodArr[index]?.close?.hours
          closingMinutes = todaysPeriodArr[index]?.close?.minutes
          break
        } else if (currentTime >= formattedTime(todaysPeriodArr[index]?.open?.hours, todaysPeriodArr[index]?.open?.minutes) && currentTime < formattedTime(todaysPeriodArr[index]?.close?.hours, todaysPeriodArr[index]?.close?.minutes)) { // store is open
          closingHours = todaysPeriodArr[index]?.close?.hours
          closingMinutes = todaysPeriodArr[index]?.close?.minutes
          openingHours = todaysPeriodArr[index]?.open?.hours
          openingMinutes = todaysPeriodArr[index]?.open?.minutes
          break
        } else {
        // closed: after store closing. We need next active day's openingHours
          for (let day = (currentDay + 1) % 7, count = 0; count < 6; day = (day + 1) % 7, count++) {
            const dayPeriodArr = place.opening_hours?.periods?.filter(
              (reqdDay) => reqdDay?.close?.day === day
            )
            if (!dayPeriodArr.length) {
              continue
            } else {
              dayIndex = Math.abs(day - currentDay) > 1 ? day : ''
              openingHours = dayPeriodArr[0]?.open?.hours
              openingMinutes = dayPeriodArr[0]?.open?.minutes
              closingHours = todaysPeriodArr[0]?.close?.hours
              closingMinutes = todaysPeriodArr[0]?.close?.minutes
              break
            }
          }
        }
      }
    }
  }
  return {
    closingTime: toRegularTime({ dayIndex, hours: closingHours, minutes: closingMinutes }) || 'N/A',
    openingTime: toRegularTime({ dayIndex, hours: openingHours, minutes: openingMinutes }) || 'N/A'
  }
}

export default {
  async fetchAddressInfo ({ commit }, { shippingAddress, returnMethods }) {
    console.log({ returnMethods })
    var isReturnMethodCommited = false
    const updatedMethods = []

    try {
      await Promise.all(
        returnMethods.map(async (method) => {
          const { type, distanceThreshold } = method
          if (type === CONSTANTS.RETURN_METHODS.MAIL_BACK) { // fault tolerance - always surface mailback options
            updatedMethods.push({
              ...method
            })
            return
          }
          const name = method?.customer_facing_carrier
          if (shippingAddress?.zip_code?.length > 5) {
            shippingAddress.zip_code = shippingAddress?.zip_code?.substring(0, 5)
          }
          const { street1, state, zip_code: zipCode, city } = shippingAddress
          const lookupKey = `${state}_${zipCode}_${city}_${name}_${type}_info`

          if (GOOGLE_MAP_API_CACHE[lookupKey]) {
            const keys = getLookupKeys(Object.keys(GOOGLE_MAP_API_CACHE), lookupKey)
            var rMethods = []
            keys.map(key => { if (GOOGLE_MAP_API_CACHE[key] && GOOGLE_MAP_API_CACHE[key].length > 0) { rMethods.push(GOOGLE_MAP_API_CACHE[key][0]) } })
            commit('updateMethods', rMethods)
            isReturnMethodCommited = true
            return GOOGLE_MAP_API_CACHE[lookupKey]
          }

          // STEP 1: Get places for the specified zipcode, city and state
          // STEP 2: Ensure the place name has specified names (storeNames) as mentioned in the policy
          // STEP 3: Filter only OPERATIONAL stores. PERMANENTLY_CLOSED stores are eliminated
          // STEP 4: Pick up the first operational, valid store (To be changed)

          let places = await googleMapsService.getPlaces(shippingAddress, name, type)
          if (places.length === 0) {
            places = await googleMapsService.getPlaces(shippingAddress, name, type, true)
            if (places.length === 0) {
              return {
                ...method
              }
            }
          }

          let validPlaces = places.filter((place) => validStoreName(place.name, type))
          if (validPlaces.length === 0) {
            places = await googleMapsService.getPlaces(shippingAddress, name, type, true)
            if (places.length === 0) {
              return {
                ...method
              }
            }
            validPlaces = places.filter((place) => validStoreName(place.name, type))
            if (validPlaces.length === 0) {
              return {
                ...method
              }
            }
          }

          const operationalStores = validPlaces.filter(
            ({ business_status: businessStatus }) =>
              !businessStatus ? true : businessStatus === 'OPERATIONAL'
          )
          if (operationalStores.length === 0) {
            return {
              ...method
            }
          }

          GOOGLE_MAP_API_CACHE[lookupKey] = []

          for (let index = 0; index < operationalStores.length; index++) {
            const result = operationalStores[index]

            const { place_id: placeId } = result

            const place = await googleMapsService.getDetails(placeId)

            const distance = await googleMapsService.getDistance(
            `${street1}, ${city}, ${state} ${zipCode}`,
            place.formatted_address
            )

            if (!isStoreWithinDistance(distance?.distance, distanceThreshold)) {
              continue
            } else {
              GOOGLE_MAP_API_CACHE[lookupKey].push({
                ...method,
                ...distance,
                formattedPhoneNumber: place?.formatted_phone_number,
                formattedAddress: place?.formatted_address,
                openingHours: {
                  isOpen: place?.opening_hours?.isOpen(),
                  weekday_text: place?.opening_hours?.weekday_text,
                  periods: place?.opening_hours?.periods,
                  todayClosingTime: getFormattedStoreTime(place).closingTime,
                  todayOpeningTime: getFormattedStoreTime(place).openingTime
                }
              })
              updatedMethods.push({
                ...method,
                ...distance,
                formattedPhoneNumber: place?.formatted_phone_number,
                formattedAddress: place?.formatted_address,
                openingHours: {
                  isOpen: place?.opening_hours?.isOpen(),
                  weekday_text: place?.opening_hours?.weekday_text,
                  periods: place?.opening_hours?.periods,
                  todayClosingTime: getFormattedStoreTime(place).closingTime,
                  todayOpeningTime: getFormattedStoreTime(place).openingTime
                }
              })
              break
            }
          }
        })
      )
    } catch (error) {
      console.error('Error fetching address Info', { error })
    }

    if (!isReturnMethodCommited) {
      console.log({ updatedMethods })
      commit('updateMethods', updatedMethods)
    }
    // commit('setLoading', false)
  },
  async fetchNearbyCarriers ({ commit }, { carrier, shippingAddress }) {
    console.log({ carrier })

    commit('setLoading', true)
    const { type, distanceThreshold } = carrier
    const name = carrier?.customer_facing_carrier
    const { street1, state, zip_code: zipCode, city } = shippingAddress
    try {
      const places = await googleMapsService.getPlaces(shippingAddress, name, type)

      let results = places
        .filter(
          ({ business_status: businessStatus }) =>
            !businessStatus ? true : businessStatus === 'OPERATIONAL'
        )
      // Only calculate distance for a max of ten results
      if (results.length > 10) {
        results = results.slice(0, 10)
      }

      const carriers = []
      for await (const result of results) {
        const { place_id: placeId } = result

        var place = GOOGLE_MAP_API_PID_CACHE[placeId]

        if (!place) {
          await sleep(200)
          place = await googleMapsService.getDetails(placeId)
          GOOGLE_MAP_API_PID_CACHE[placeId] = place

          await sleep(200)
        }
        const distance = await googleMapsService.getDistance(
          `${street1}, ${city}, ${state} ${zipCode}`,
          place.formatted_address
        )

        const carrierAlreadyRecorded = carriers.findIndex(carrier => carrier?.formattedAddress === place?.formatted_address) !== -1

        if (isStoreWithinDistance(distance.distance, distanceThreshold) && validStoreName(place.name, type) && !carrierAlreadyRecorded) {
          carriers.push({
            ...carrier,
            ...distance,
            name: place.name,
            formattedPhoneNumber: place?.formatted_phone_number,
            formattedAddress: place?.formatted_address,
            icon: result.icon,
            openingHours: {
              isOpen: place?.opening_hours?.isOpen(),
              weeklyRange: checkMapsPolicy() ? getWeeklyRange(place) : '',
              weekday_text: place?.opening_hours?.weekday_text,
              periods: place?.opening_hours?.periods,
              todayClosingTime: getFormattedStoreTime(place).closingTime,
              todayOpeningTime: getFormattedStoreTime(place).openingTime
            }
          })
        }
      }

      carriers.sort(
        (a, b) => +a.distance.split(' ')[0] - +b.distance.split(' ')[0]
      ).slice(0, 3)

      commit('setNearbyCarriers', carriers)
      commit('setLoading', false)
    } catch (error) {
      console.error('Error fetching nearby locations', { error })
      await sleep(5000)
      store.dispatch('returns/fetchNearbyCarriers', {
        carrier: carrier,
        shippingAddress: shippingAddress
      })
    }
  }
}
