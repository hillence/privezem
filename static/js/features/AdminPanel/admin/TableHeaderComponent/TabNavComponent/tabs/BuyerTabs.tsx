import React from 'react'

import styles from './TabsStyles.module.scss'

import { AdminPanelTabsType } from 'app/store/appReducer/types'
import { Badge } from 'common/ui'

type BuyerTabsPropsType = {
  activeTab: AdminPanelTabsType
  orderListCount: number
  myOrdersCount: number
  tabsHandler: (tab: AdminPanelTabsType) => void
}
export const BuyerTabs = (props: BuyerTabsPropsType) => {
  const { activeTab, orderListCount, tabsHandler, myOrdersCount } = props

  return (
    <>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'ordersList' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('ordersList')}
        >
          <span>список заказов</span>
        </div>

        <Badge value={orderListCount} isActive={activeTab === 'ordersList'} />
      </div>
      <div className={styles.tabItem}>
        <div
          className={activeTab === 'myOrders' ? styles['tabTitle--active'] : styles['tabTitle']}
          onClick={() => tabsHandler('myOrders')}
        >
          <span>мои заказы</span>
        </div>

        <Badge value={myOrdersCount} isActive={activeTab === 'myOrders'} />
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
