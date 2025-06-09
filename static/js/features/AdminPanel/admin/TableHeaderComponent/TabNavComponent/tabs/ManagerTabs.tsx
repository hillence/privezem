import React from 'react'

import styles from './TabsStyles.module.scss'

import { AdminPanelTabsType } from 'app/store/appReducer/types'
import { Badge } from 'common/ui'

type ManagerTabsPropsType = {
  activeTab: AdminPanelTabsType
  allOrderCount: number
  tabsHandler: (tab: AdminPanelTabsType) => void
}
export const ManagerTabs = (props: ManagerTabsPropsType) => {
  const { activeTab, allOrderCount, tabsHandler } = props

  return (
    <>
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
    </>
  )
}
