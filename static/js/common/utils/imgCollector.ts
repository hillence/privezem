import CartType from '../../types/cart-type'

export const imgCollector = (cart: CartType) => {
  const productImages: string[] = []

  Object.entries(cart).forEach(([_, value]) => {
    if (value?.length > 0) {
      for (const item of value) {
        item.productImg && productImages.push(item.productImg)
      }
    }
  })

  return productImages
}
