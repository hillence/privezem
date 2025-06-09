import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import UserAccount from '../UserAccount'

import styles from './OrderHistory.module.scss'

import {
  getUserOrderHistoryTC,
  getUserReturnedOrdersTC,
  selectedAllOrderHistory,
  selectedAllOrderHistoryCount,
  selectedReturnedOrderHistory,
  selectedReturnedOrderHistoryCount,
  selectedUserCurrentPage,
  selectedUserPageSize,
} from 'app/store'
import { setUserCurrentPageAC } from 'app/store/userReducer/actions'
import {
  EmptyOrdersComponent,
  MobileOrderComponent,
  OrderComponent,
  OrdersTabComponent,
  Pagination,
} from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'

// type OrderHistoryPropsType = {
//   currentOrderHandler: (orderId: string) => void
// }
const OrderHistory = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'returns'>('orders')
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const allOrders = useAppSelector(selectedAllOrderHistory)
  const ordersCount = useAppSelector(selectedAllOrderHistoryCount)
  const returnsOrders = useAppSelector(selectedReturnedOrderHistory)
  const returnOrdersCount = useAppSelector(selectedReturnedOrderHistoryCount)

  const currentPage = useAppSelector(selectedUserCurrentPage)
  const pageSize = useAppSelector(selectedUserPageSize)
  const allOrderCount = useAppSelector(selectedAllOrderHistoryCount)
  const returnedOrderCount = useAppSelector(selectedReturnedOrderHistoryCount)

  const renderOrders = activeTab === 'orders' ? allOrders : returnsOrders

  const activeTabHandler = (tab: 'orders' | 'returns') => {
    if (tab === 'orders') {
      setActiveTab(tab)
      dispatch(setUserCurrentPageAC(1))
      dispatch(getUserOrderHistoryTC({ page: 1, pageSize }))
    } else {
      setActiveTab(tab)
      dispatch(setUserCurrentPageAC(1))
      dispatch(getUserReturnedOrdersTC({ page: 1, pageSize }))
    }
  }
  const navigateToOrderHandler = (orderId: string) => {
    // dispatch(getUserCurrentOrderTC(orderId))
    // dispatch(setUserAccountTabAC('currentOrder'))
    navigate(`/user-account/history/${orderId}`)
  }

  const pageChangeHandler = (pageNumber: number) => {
    if (activeTab === 'orders') {
      dispatch(getUserOrderHistoryTC({ page: pageNumber, pageSize }))
    } else {
      dispatch(getUserReturnedOrdersTC({ page: pageNumber, pageSize }))
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(getUserOrderHistoryTC({ page: 1, pageSize }))
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <UserAccount>
      <div className={styles.box}>
        <OrdersTabComponent
          ordersCount={allOrderCount}
          returnsCount={returnedOrderCount}
          activeTab={activeTab}
          activeTabHandler={activeTabHandler}
        />
        <div className={styles.contentBox}>
          <div className={styles.ordersList}>
            {!isMobile ? (
              <OrderComponent orders={renderOrders} onClick={navigateToOrderHandler} />
            ) : (
              <MobileOrderComponent orders={renderOrders} onClick={navigateToOrderHandler} />
            )}
            {(ordersCount === 0 && activeTab === 'orders') ||
            (returnOrdersCount === 0 && activeTab === 'returns') ? (
              <EmptyOrdersComponent activeTab={activeTab} />
            ) : null}
            <Pagination
              totalCount={activeTab === 'orders' ? ordersCount : returnOrdersCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChanged={pageChangeHandler}
            />
          </div>
        </div>
      </div>
    </UserAccount>
  )
}

export default OrderHistory
