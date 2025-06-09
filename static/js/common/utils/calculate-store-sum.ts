import ProductType from '../../types/product-type'

export const calculateStoreSum = (goods: ProductType[]): { rubles: number; pounds: number } => {
  const initialSum = { rubles: 0, pounds: 0 }

  if (!goods || goods.length === 0) {
    return initialSum
  } else {
    return goods.reduce(
      (sum, item) => ({
        rubles: sum.rubles + item.productPrice.rubles * item.productQuantity,
        pounds: sum.pounds + item.productPrice.euro * item.productQuantity,
      }),
      initialSum
    )
  }
}
