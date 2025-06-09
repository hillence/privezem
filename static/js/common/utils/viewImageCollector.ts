import { ViewProductType } from 'app/store/userReducer/types'
import CartType from 'types/cart-type'

export const viewImageCollector = async (cart: CartType): Promise<ViewProductType[]> => {
  const result: ViewProductType[] = []

  Object.values(cart).forEach(products => {
    if (Array.isArray(products)) {
      const productsData = products.map(product => ({
        productId: product.productId,
        productImg: product.productImg,
      }))

      result.push(...productsData)
    }
  })

  return result
}
