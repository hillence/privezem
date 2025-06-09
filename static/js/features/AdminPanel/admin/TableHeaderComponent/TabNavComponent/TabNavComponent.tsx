import React from 'react'

import classNames from 'classnames'
import { useParams } from 'react-router-dom'

import styles from './TabNavComponent.module.scss'
import { AdminTabs } from './tabs/AdminTabs'
import { BuyerTabs } from './tabs/BuyerTabs'
import { ManagerTabs } from './tabs/ManagerTabs'

import {
  AdminPanelTabsType,
  selectedMyOrdersCount,
  selectedOrderListCount,
  selectedTotalOrdersCount,
  setAdminPanelTabAC,
  setBuyerAccountTabAC,
} from 'app/store'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'

type TabNavPropsType = {
  activeTab: AdminPanelTabsType
  clearSearchValue?: () => void
}
export const TabNavComponent = (props: TabNavPropsType) => {
  const { activeTab, clearSearchValue } = props
  const dispatch = useAppDispatch()
  const { role } = useParams()
  // const totalEmployeeCount = useAppSelector(selectedTotalEmployeeCount)
  const totalOrdersCount = useAppSelector(selectedTotalOrdersCount)
  // const inPaymentOrderCount = useAppSelector(selectedTotalInPaymentCount)
  const orderListCount = useAppSelector(selectedOrderListCount)
  const myOrdersCount = useAppSelector(selectedMyOrdersCount)

  const isAdmin = role === 'admin'
  const isManager = role === 'manager'
  const isBuyer = role === 'buyer'

  const tabsHandler = async (tab: AdminPanelTabsType) => {
    clearSearchValue && clearSearchValue() // clear search value on tab change
    if (isBuyer) dispatch(setBuyerAccountTabAC(tab))
    if (isAdmin || isManager) dispatch(setAdminPanelTabAC(tab))
  }

  const tabContainer = classNames({
    [styles.tabContainer]: true,
    [styles.tabManagerContainer]: isManager && !isAdmin,
  })

  return (
    <div className={tabContainer}>
      <div className={styles.tabBox}>
        {isAdmin && (
          <AdminTabs
            tabsHandler={tabsHandler}
            activeTab={activeTab}
            allOrderCount={totalOrdersCount}
            myOrdersCount={myOrdersCount}
            orderListCount={orderListCount}
          />
        )}
        {isManager && (
          <ManagerTabs
            tabsHandler={tabsHandler}
            activeTab={activeTab}
            allOrderCount={totalOrdersCount}
          />
        )}
        {isBuyer && (
          <BuyerTabs
            tabsHandler={tabsHandler}
            activeTab={activeTab}
            orderListCount={orderListCount}
            myOrdersCount={myOrdersCount}
          />
        )}
      </div>
    </div>
  )
}
