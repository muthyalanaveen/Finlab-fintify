import store from '@/store'
import { CONSTANTS } from '@/constants'
import { UPDATE_EXCHANGE_LIST } from '@/store/constants'
import { getIsGift } from '@/store/sessionStorage.js'

const RETURN_REASON_ACTION = CONSTANTS.RETURN_REASON_ACTION
const ACTION_TYPE = CONSTANTS.ACTION_TYPE

export const isExchangesEnabled = () => {
  const { exchangesAllowed, isExchangeOrder } = getFieldsFromStore()

  return exchangesAllowed && !isExchangeOrder && canExchangeMultiple()
}

export const canExchange = (recommendationType) => {
  if (!isExchangesEnabled()) return false

  const { item } = getFieldsFromStore()
  var isExchange = false

  if (
    recommendationType.toLowerCase() === RETURN_REASON_ACTION.SIZE.toLowerCase()
  ) {
    const variants = getSizeOptionsForSelectedVariant(item?.color)
    isExchange = variants.filter((v) => !v.disabled).length > 0
  } else if (
    recommendationType.toLowerCase() ===
    RETURN_REASON_ACTION.COLOR.toLowerCase()
  ) {
    const variants = getColorOptionsForSelectedVariant(item)
    isExchange = variants.filter((v) => !v.disabled).length > 0
  } else if (
    recommendationType.toLowerCase() ===
    RETURN_REASON_ACTION.DAMAGED.toLowerCase()
  ) {
    const variant = getVariantForItem(item)
    isExchange = variant && variant.quantity_in_stock > 0
  } else if (
    recommendationType.toLowerCase() ===
    RETURN_REASON_ACTION.OTHER.toLowerCase()
  ) {
    const variants = getColorOptionsForPDP()
    isExchange = variants.filter((v) => !v.disabled).length > 0
  }

  return isExchangesEnabled() && isExchange
}
// an item can be exchanged for size if and only if the following is true:
// 1. the client has exchanges allowed == true
// 2. at least one of the variants has quantity_in_stock > 0
// 3. that variant is of the same color as the item
// 4. not a gift return
// 5. is a trustworthyuser
// 6. there is at least one item that is not disabled

export const canExchangeSize = () => {
  if (!isExchangesEnabled()) return false

  const { item, isTrustWorthyUser, reason } = getFieldsFromStore()
  const variants = getSizeOptionsForSelectedVariant(item?.color)
  const hasSizeOptions = variants.filter((v) => !v.disabled).length > 0

  return (
    isExchangesEnabled() &&
    reason.recommendation_type?.toLowerCase() ===
      RETURN_REASON_ACTION.SIZE.toLowerCase() &&
    hasSizeOptions &&
    isTrustWorthyUser
  )
}

export const canExchangeColor = () => {
  if (!isExchangesEnabled()) return false

  const { item, isTrustWorthyUser, reason } = getFieldsFromStore()
  const variants = getColorOptionsForSelectedVariant(item)
  const hasColorOptions = variants.filter((v) => !v.disabled).length > 0

  return (
    isExchangesEnabled() &&
    reason.recommendation_type?.toLowerCase() ===
      RETURN_REASON_ACTION.COLOR.toLowerCase() &&
    hasColorOptions &&
    isTrustWorthyUser
  )
}
export const canExchangeDamaged = () => {
  if (!isExchangesEnabled()) return false

  const { item, isTrustWorthyUser, reason } = getFieldsFromStore()
  const variant = getVariantForItem(item)
  const enabled = variant && variant.quantity_in_stock > 0

  return (
    isExchangesEnabled() &&
    reason.recommendation_type?.toLowerCase() ===
      RETURN_REASON_ACTION.DAMAGED.toLowerCase() &&
    enabled &&
    isTrustWorthyUser
  )
}
export const canExchangeOther = () => {
  if (!isExchangesEnabled()) return false

  const {
    // item,
    isTrustWorthyUser,
    reason
  } = getFieldsFromStore()

  const variants = getColorOptionsForPDP()
  const hasOptions = variants.filter((v) => !v.disabled).length > 0

  return (
    isExchangesEnabled() &&
    reason.recommendation_type?.toLowerCase() ===
      RETURN_REASON_ACTION.OTHER.toLowerCase() &&
    hasOptions &&
    isTrustWorthyUser
  )
}

export const canExchangeMultiple = () => {
  const { selectedItems, multiItemExchangeEnabled, multiLineSameItemExchangeEnabled, item } = getFieldsFromStore()

  const hasMultiLine = item?.quantity > 1

  if (selectedItems.length === 1) { // base case
    return hasMultiLine ? multiLineSameItemExchangeEnabled : true
  }

  return hasMultiLine ? multiLineSameItemExchangeEnabled && multiItemExchangeEnabled : multiItemExchangeEnabled
}

/*
 * GETTERS
 */

// Return the options for each variant
export const getSizeOptionsForSelectedVariant = (selectedColor) => {
  if (!selectedColor) return []

  const { item } = getFieldsFromStore()
  let originalVariantIncluded = false

  const sizes = item.exchangeVariants
    ?.filter(
      (variant) => variant.color.toLowerCase() === selectedColor.toLowerCase()
    )
    .map((variant) => {
      if (variant.sku.toLowerCase() === item.sku.toLowerCase()) {
        originalVariantIncluded = true
      }
      return {
        ...variant,
        disabled:
          variant.sku.toLowerCase() === item.sku.toLowerCase() ||
          variant.quantity_in_stock <= 0,
        subtitle:
          variant.sku.toLowerCase() === item.sku.toLowerCase()
            ? 'Original Purchase'
            : ''
      }
    })

  if (
    item.color.toLowerCase() === selectedColor.toLowerCase() &&
    !originalVariantIncluded
  ) {
    sizes.push({
      ...item,
      disabled: true,
      subtitle: 'Original Purchase'
    })
  }

  return sizes.length > 0 ? sortSizes(sizes) : []
}

export const getColorOptionsForSelectedVariant = (item) => {
  let originalVariantIncluded = false
  let colors = item.exchangeVariants
    ?.filter(
      (variant) => variant.size.toLowerCase() === item.size.toLowerCase()
    )
    .map((variant) => {
      if (variant.sku.toLowerCase() === item.sku.toLowerCase()) {
        originalVariantIncluded = true
      }
      return {
        ...variant,
        disabled:
          variant.sku.toLowerCase() === item.sku.toLowerCase() ||
          variant.quantity_in_stock <= 0,
        name: variant.title,
        subtitle:
          variant.sku.toLowerCase() === item.sku.toLowerCase()
            ? 'Original Purchase'
            : ''
      }
    })

  if (!originalVariantIncluded) {
    colors = [
      {
        ...item,
        disabled: true,
        name: item.title,
        subtitle: 'Original Purchase'
      },
      ...colors
    ]
  }
  return colors
}

export const getColorOptionsForPDP = () => {
  const { item } = getFieldsFromStore()

  // 1 get all color options and make disabled by default
  // 2 check the sizes for each option and if at least one not disabled, make color enabled
  // filter out the disabled colors
  return getColorOptionsForSelectedVariant(item)
    .map((option) => {
      const enabled =
        getSizeOptionsForSelectedVariant(option.color).filter(
          (v) => !v.disabled
        ).length > 0

      return { ...option, disabled: !enabled }
    })
    .filter((option) => !option.disabled)
}

export const getColorOptionsForColorView = () => {
  const { item } = getFieldsFromStore()

  const options = getColorOptionsForSelectedVariant(item)

  const filtered = options.filter(
    (o) =>
      !o.disabled ||
      o.subtitle.toLowerCase() === 'Original Purchase'.toLowerCase()
  )

  return filtered
}

export const getPreviouslySelectedOption = () => {
  const { item, exchangeList } = getFieldsFromStore()

  return exchangeList?.find(
    (exchangedItem) =>
      exchangedItem?.identifier.toLowerCase() === item?.identifier.toLowerCase()
  )
}

export const getDefaultValue = (
  actionType = ACTION_TYPE.SIZE,
  selectedColor
) => {
  const { item } = getFieldsFromStore()

  const previouslySelectedOption = getPreviouslySelectedOption()

  //  if the actiontype is color, and there is a a previously selected option,
  // return the previously selected color
  // else return undefind
  if (actionType.toLowerCase() === ACTION_TYPE.COLOR.toLowerCase()) {
    if (
      previouslySelectedOption &&
      previouslySelectedOption.size.toLowerCase() === item.size.toLowerCase()
    ) {
      return previouslySelectedOption
    } else {
      return undefined
    }
  }
  const items = getSizeOptionsForSelectedVariant(selectedColor || item?.color)

  const originalItem = items.find(
    (e) => e.subtitle.toLowerCase() === 'Original Purchase'.toLowerCase()
  )
  // return the previously selected item by default unless the previously selected item was not of the same color as the default item
  let defaultItem = previouslySelectedOption || originalItem || items[0]

  if (
    originalItem &&
    previouslySelectedOption &&
    originalItem.color !== previouslySelectedOption?.color
  ) {
    defaultItem = originalItem
  }
  return defaultItem
}

export const saveSelectedItemToStore = (selectedItem) => {
  const { item, reason } = getFieldsFromStore()
  store.commit('order/' + UPDATE_EXCHANGE_LIST, {
    ...selectedItem,
    identifier: item.identifier,
    original_item: item,
    reason: reason,
    quantity: item.quantity
  })
}

export const handleColorOrSizeOptionSelected = (
  selectedItem,
  actionType,
  item,
  selectedSize,
  selectedColor
) => {
  let variants = []
  if (actionType.toLowerCase() === ACTION_TYPE.COLOR.toLowerCase()) {
    variants = getSizeOptionsForSelectedVariant(selectedColor)
  }
  if (actionType.toLowerCase() === ACTION_TYPE.SIZE.toLowerCase()) {
    variants = getColorOptionsForSelectedVariant(item)
  }

  const optionForSelectedSizeAndColor = variants.find(
    (variant) =>
      variant.size.toLowerCase() === selectedSize.toLowerCase() &&
      variant.color.toLowerCase() === selectedColor.toLowerCase()
  )

  if (
    optionForSelectedSizeAndColor &&
    !optionForSelectedSizeAndColor.isDisabled
  ) {
    selectedItem = optionForSelectedSizeAndColor
    selectedSize = optionForSelectedSizeAndColor.size
    selectedColor = optionForSelectedSizeAndColor.color
  } else {
    if (actionType.toLowerCase() === ACTION_TYPE.COLOR.toLowerCase()) {
      selectedSize = null
    }
  }

  return {
    selectedSize,
    selectedColor,
    selectedItem
  }
}

export const getVariantForItem = (
  item,
  size = item.size,
  color = item.color
) => {
  return item.exchangeVariants.find(
    (variant) =>
      variant.size.toLowerCase() === size.toLowerCase() &&
      variant.color.toLowerCase() === color.toLowerCase()
  )
}

export const isSameVariant = ({ size, color }) => {
  const { item } = getFieldsFromStore()
  return (
    item.color.toLowerCase() === color.toLowerCase() &&
    item.size.toLowerCase() === size.toLowerCase()
  )
}

const getFieldsFromStore = () => {
  const { exchanges_allowed: exchangesAllowed } = store.getters[
    'returns/policies'
  ]
  const currentItemIndex = store.getters['returns/currentItemIndex']
  const selectedItems = store.getters['order/selectedItems']
  const item = selectedItems[currentItemIndex]
  const isGiftReturn = getIsGift()
  const reason = store.getters['returns/reason']
  const exchangeList = store.getters['order/exchangeList']
  const exchangeEligibility = store.getters['exchange/getExchangeEligibility']
  const multiItemExchangeEnabled = store.getters['returns/returnIsMultiItemExchangeEnabled']
  const multiLineSameItemExchangeEnabled = store.getters['returns/returnIsMultiLineSameItemExchangeEnabled']
  const isTrustWorthyUser = exchangeEligibility?.repurchase_model_decision
  const isExchangeOrder = store.getters['order/isExchangeOrder']

  return {
    exchangesAllowed,
    item,
    isTrustWorthyUser,
    isGiftReturn,
    reason,
    selectedItems,
    exchangeList,
    multiLineSameItemExchangeEnabled,
    multiItemExchangeEnabled,
    isExchangeOrder
  }
}

const sortSizes = (sizes) => {
  // Order sizes before returning them
  const sizeOrder = ['XXXL', 'XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS', 'XXXS']

  if (sizeOrder.includes(sizes[0].size)) {
    return sizes.sort((a, b) => {
      return sizeOrder.indexOf(b.size) - sizeOrder.indexOf(a.size)
    })
  } else if (Number(sizes[0].size)) {
    return sizes.sort((a, b) => Number(b.size) - Number(a.size))
  } else {
    return sizes.sort((a, b) => b.size < a.size)
  }
}
