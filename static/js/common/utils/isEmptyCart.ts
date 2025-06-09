import CartType from '../../types/cart-type'

export const isEmptyCart = (cart: CartType): boolean => {
  return Object.values(cart).every(store => store?.length === 0)
}
