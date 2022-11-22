import pako from 'pako'
import { ORDER_DISPLAY } from 'branding/strings.json'

export function formatText (word) {
  return word
    .split(' ')
    .map((word) => {
      if (word.length < 18) return word
      else return splitWord(word)
    })
    .join(' ')
}

export function splitWord (word) {
  var middle = Math.floor(word.length / 2)

  var s1 = word.substr(0, middle)
  var s2 = word.substr(middle + 1)

  return s1 + ' ' + s2
}

export function pad (num, size) {
  num = num.toString()
  while (num.length < size) num = '0' + num
  return num
}

export function validateOrderId (str) {
  const orderIdRex = /[a-zA-Z0-9]/g
  if (str !== undefined && str !== null) {
    if (str.length >= 4 && orderIdRex.test(str)) {
      return true
    }
  }
  return false
}

export function runAccessibilityForProductCards (isPdpPage) {
  let cards = null
  if (isPdpPage) {
    cards = document.getElementById('pdp-page-product-slide')
  } else {
    cards = document.getElementById('exchange-color-product-slide')
  }
  const elements = cards.getElementsByClassName('product-card-selector')
  for (var el of elements) {
    el.setAttribute('role', 'radio')
    // el.removeAttribute('tabindex') - TODO: uncomment once 3182 is unpaused
  }
}

export const validateEmail = (email) => String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

export const validateZipcode = (zipcode) => {
  let zipcodeRex = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/g
  if (zipcode.length === 6 || zipcode.length === 7) {
    zipcodeRex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
  }
  const checkIsZipcode = zipcodeRex.test(zipcode)
  return checkIsZipcode
}

export function getFormattedDate (date) {
  date = new Date(date)
  if (date) {
    const year = date.getFullYear()
    const month = (1 + date.getMonth()).toString().padStart(2, '0')
    const day = date
      .getDate()
      .toString()
      .padStart(2, '0')

    return month + '/' + day + '/' + year
  }
  return date
}

export function dayOfWeekAsString (dayIndex) {
  return (
    [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ][dayIndex] || ''
  )
}

export function toRegularTime ({ dayIndex = '', hours, minutes }) {
  return hours === null || hours === null
    ? ''
    : `${hours > 12 ? hours - 12 : hours}:${
        minutes < 10 ? '0' + minutes : minutes
      } ${hours >= 12 ? 'PM' : 'AM'} ${dayIndex &&
        'on ' + dayOfWeekAsString(dayIndex)}`
}

export function convertImageData (imageBase64Data) {
  if (!imageBase64Data) return

  // Decode base64 (convert ascii to binary)
  const strData = atob(imageBase64Data)

  // Convert binary string to character-number array
  const charData = strData.split('').map(function (x) {
    return x.charCodeAt(0)
  })

  // Turn number array into byte-array
  const binData = new Uint8Array(charData)

  // Pako magic
  const data = pako.inflate(binData)

  // Convert gunzipped byteArray back to ascii string:
  const imgData = String.fromCharCode.apply(null, new Uint16Array(data))
  const encodedImgData = encodeURIComponent(imgData)
  const image = 'data:image/svg+xml;utf8,' + encodedImgData

  return image
}

export function flattenVariant (variant) {
  const flattenedAttributes = {}
  variant.attributes.forEach((a) => {
    flattenedAttributes[a.name.toLowerCase()] = a.value
  })
  return {
    ...flattenedAttributes,
    ...variant
  }
}

export function flattenVariants (rawVariants) {
  return rawVariants.map((v) => flattenVariant(v))
}

export function getDistanceValue (measure) {
  return parseFloat(measure?.replace(/,/g, '').split(' ')[0]) // separate unit part and return only value as a number
}

export function isStoreWithinDistance (distance, maxDistance) {
  return getDistanceValue(distance) <= maxDistance
}

export function getLookupKeys (keysArr, checkingString) {
  // ${state}_${zipCode}_${city}_${name}_${type}_info
  const splitCheckingStringArr = checkingString.split('_')
  const reqdKeys = keysArr.filter((lookupKey) => {
    const splitLookupStringArr = lookupKey.split('_')
    if (
      splitCheckingStringArr.length === 6 &&
      splitCheckingStringArr[0] === splitLookupStringArr[0] &&
      splitCheckingStringArr[1] === splitLookupStringArr[1] &&
      splitCheckingStringArr[2] === splitLookupStringArr[2] &&
      splitCheckingStringArr[5] === splitLookupStringArr[5]
    ) {
      return true
    }
    return false
  })
  return reqdKeys
}

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const objectMap = (obj, fn) => obj ? Object.fromEntries(
  Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
) : obj

export const trim = (v) => {
  if (typeof v === 'string') {
    return v.trim()
  }
  return v
}

export const returnFormattedOrderNumber = (orderNumber) => {
  return ORDER_DISPLAY.ORDER + ' #' + orderNumber
}

export const trimExtraSpacesFromStringsInObject = (obj) => objectMap(obj, trim)

export function runAccessibilityForRadioGroup (isColor) {
  const radioGroupLabel = document.querySelectorAll('.v-input--radio-group__input')
  if (isColor) {
    radioGroupLabel[0].removeAttribute('aria-labelledby')
    radioGroupLabel[0].setAttribute('aria-label', 'Select a color')
  } else { radioGroupLabel[0].setAttribute('aria-labelledby', 'selectsize') }

  radioGroupLabel[1].removeAttribute('aria-labelledby')
  radioGroupLabel[1].setAttribute('aria-label', 'Select a color')
}

export const formatTags = (item) => {
  const formattedItemTags = {}
  // parse tags if in format tag:value
  const parsedTags = item?.tags?.map(tag => tag?.includes(':') ? tag?.split(':') : tag)
  // add tags to formattedTags object -- format: tag:value or tag:true
  if (parsedTags) {
    parsedTags.forEach(tag => {
      if (Array.isArray(tag) && tag.length > 1) {
        formattedItemTags[tag[0]] = tag[1]
      } else {
        formattedItemTags[tag] = true
      }
    })
  }
  return formattedItemTags
}
