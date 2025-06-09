import { AvailableBrandEnum } from '../../types/available-brand-enum'
import CartType from '../../types/cart-type'
import ProductType from '../../types/product-type'

export const getEmptyCart = (): CartType => {
  return Object.keys(AvailableBrandEnum).reduce((acc, key) => {
    acc[key as keyof typeof AvailableBrandEnum] = []

    return acc
  }, {} as CartType)
}

export const getCartWithGoods = (cart: CartType): CartType => {
  const distributedCart: CartType = Object.keys(AvailableBrandEnum).reduce((acc, key) => {
    acc[key as keyof typeof AvailableBrandEnum] = cart[key as keyof typeof AvailableBrandEnum] || []

    return acc
  }, {} as CartType)

  Object.values(cart)
    .flat()
    .forEach((product: ProductType) => {
      const brandKey = product.brandType as keyof typeof AvailableBrandEnum

      if (distributedCart[brandKey]) {
        distributedCart[brandKey].push(product)
      }
    })

  return distributedCart
}