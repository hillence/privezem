import ProductType from '../../types/product-type'

export const calculateItemSum = (items: ProductType[]) => {
  // Создаем объект для хранения сумм товаров сгруппированных по productId
  const groupedItems: Record<string, { euro: number; rubles: number }> = {}

  // Проходим по каждому товару и добавляем его к сумме в соответствующей группе
  items.forEach(item => {
    const { productId, productPrice, productQuantity } = item

    if (!groupedItems[productId]) {
      groupedItems[productId] = { euro: 0, rubles: 0 }
    }

    groupedItems[productId].euro += productPrice.euro * productQuantity
    groupedItems[productId].rubles += productPrice.rubles * productQuantity
  })

  // Вычисляем общую сумму для всех групп товаров
  const euro = Object.values(groupedItems).reduce((sum, group) => sum + group.euro, 0)
  const rubles = Object.values(groupedItems).reduce((sum, group) => sum + group.rubles, 0)

  return {
    euro,
    rubles,
  }
}