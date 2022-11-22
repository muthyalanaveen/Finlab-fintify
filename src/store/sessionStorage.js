
import { CONSTANTS } from '@/constants/index.js'

export function getIsGift () {
  return (sessionStorage.getItem(CONSTANTS.IS_GIFT_VALUE) || 'false')?.toLowerCase() === 'true'
}

export function getGiftEmail () {
  return sessionStorage.getItem(CONSTANTS.GIFT_RETURN_EMAIL_VALUE)
}

export function setGiftEmail (giftEmail) {
  sessionStorage.setItem(CONSTANTS.GIFT_RETURN_EMAIL_VALUE, giftEmail)
}

export function setIsGift (isGift) {
  sessionStorage.setItem(CONSTANTS.IS_GIFT_VALUE, isGift)
}

export function clearSession () {
  sessionStorage.clear()
}

export function clearGiftEmail () {
  sessionStorage.removeItem(CONSTANTS.GIFT_RETURN_EMAIL_VALUE)
}
