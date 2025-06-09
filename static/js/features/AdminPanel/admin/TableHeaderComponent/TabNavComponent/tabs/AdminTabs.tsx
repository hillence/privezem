import React from 'react'

import styles from './TabsStyles.module.scss'

import { AdminPanelTabsType } from 'app/store/appReducer/types'
import { Badge } from 'common/ui'

type AdminTabsPropsType = {
  activeTab: AdminPanelTabsType
  tabsHandler: (tab: AdminPanelTabsType) => void
  allOrderCount: number
  myOrdersCount: number
  orderListCount: number
}
export const AdminTabs = (props: AdminTabsPropsType) => {
  const { activeTab, tabsHandler, allOrderCount, myOrdersCount, orderListCount } = props

  return (
    <>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'inPayment' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('inPayment')}
        >
          <span>на оплату</span>
        </div>

        <Badge value={orderListCount} isActive={activeTab === 'inPayment'} />
      </div>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'myOrders' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('myOrders')}
        >
          мои заказы
        </div>

        <Badge value={myOrdersCount} isActive={activeTab === 'myOrders'} />
      </div>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'orders' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('orders')}
        >
          заказы
        </div>

        <Badge value={allOrderCount} isActive={activeTab === 'orders'} />
      </div>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'stuff' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('stuff')}
        >
          <span>пользователи</span>
        </div>

        {/*<Badge value={employeeCount} isActive={activeTab === 'stuff'} />*/}
      </div>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'cards' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('cards')}
        >
          <span>карты</span>
        </div>
      </div>
    </>
  )
}
