import { AdminPanelTabsType } from '../../app/store'

export const placeholderHandler = (activeTab: AdminPanelTabsType) => {
  switch (activeTab) {
    case 'orders':
      return {
        inputPlaceholder: 'поиск по заказам',
        modalTitle: 'поиск по заказам',
        modalPlaceholder: 'введите информацию о заказе',
      }
    case 'inPayment':
      return {
        inputPlaceholder: 'поиск по заказам на оплату',
        modalTitle: 'поиск по заказам на оплату',
        modalPlaceholder: 'введите информацию о заказе',
      }
    case 'stuff':
      return {
        inputPlaceholder: 'поиск по пользователям',
        modalTitle: 'поиск по пользователям',
        modalPlaceholder: 'введите информацию о пользователе',
      }
    case 'ordersList':
      return {
        inputPlaceholder: 'поиск по списку заказов',
        modalTitle: 'поиск по списку заказов',
        modalPlaceholder: 'введите информацию о заказе',
      }
    case 'myOrders':
      return {
        inputPlaceholder: 'поиск по моему списку заказов',
        modalTitle: 'поиск по моему списку заказов',
        modalPlaceholder: 'введите информацию о заказе',
      }
    default:
      return {
        inputPlaceholder: 'поиск',
        modalTitle: 'поиск',
        modalPlaceholder: 'введите информацию',
      }
  }
}
