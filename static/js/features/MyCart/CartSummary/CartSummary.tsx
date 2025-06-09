import React, { useCallback, useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import styles from './CartSummary.module.scss'
import { Discount } from './Discount'

import { checkTokenInCookie } from 'api/cookieWorkers'
import { PATH } from 'app/routes/AppRoutes'
import {
  selectedBonuses,
  selectedDeliveryCost,
  selectedIsUseDiscount,
  selectedServiceFee,
  selectedTotalRubSum,
} from 'app/store'
import { selectedAppStatus } from 'app/store/selectors/appSelectors'
import { useAppSelector } from 'common/hooks/customHooks'
import { Button } from 'common/ui'
import Tooltip from 'common/ui/Tooltip/Tooltip'
import { formatSum } from 'common/utils/format-sum'
import CartType from 'types/cart-type'

type Props = {
  cart: CartType
  createOrder?: () => void
  formik?: any
}

export const CartSummary = (props: Props) => {
  const { cart, createOrder, formik } = props
  const userBonuses = useAppSelector(selectedBonuses)
  const location = useLocation()
  const isUseDiscount = useAppSelector(selectedIsUseDiscount)
  const totalSum = useAppSelector(selectedTotalRubSum)
  const deliveryCost = useAppSelector(selectedDeliveryCost)
  const serviceFee = useAppSelector(selectedServiceFee)
  const appStatus = useAppSelector(selectedAppStatus)

  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'right' | 'left'>('top')
  const [isTextMobile, setIsTextMobile] = useState(false)
  const [isFixed, setIsFixed] = useState<boolean>(true)

  let disabled =
    location.pathname === PATH.MY_CART
      ? false
      : !formik?.errors ||
        !formik.dirty ||
        Object.keys(formik.errors).length > 0 ||
        Object.values(cart).every(item => item.length === 0)

  const tooltipTitle = !isUseDiscount
    ? `Цена с учётом комиссии сервиса — ${serviceFee}%`
    : `Цена с учётом всех скидок`

  const mobileTooltipPosition = checkTokenInCookie('agreed-with-cookie') ? 'top' : 'right-bottom'

  useEffect(() => {
    const tooltipPositionHandler = () => {
      const screenWidth = window.innerWidth

      if (screenWidth >= 1440) {
        setTooltipPosition('right')
      } else if (screenWidth < 1025) {
        setTooltipPosition('right')
      } else {
        setTooltipPosition('top')
      }
    }

    const handleResize = () => {
      tooltipPositionHandler()
      // setIsMobile(window.innerWidth <= 1024)
      setIsTextMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  //for fixed summary =================================================================================
  const handleScroll = useCallback(() => {
    const summary = document.getElementById('cart-summary')
    const block = document.getElementById('block-summary')

    if (!summary || !block) return

    const blockHeight = block.offsetHeight
    const summaryRect = summary.getBoundingClientRect()

    // Высота видимой части summary
    const visibleSummaryHeight =
      Math.min(window.innerHeight, summaryRect.bottom) - Math.max(117, summaryRect.top)

    // Проверяем, нужно ли обновить isFixed
    const shouldFix = visibleSummaryHeight > blockHeight

    if (isFixed !== shouldFix) {
      setIsFixed(shouldFix)
    }
  }, [isFixed])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  useEffect(() => {
    handleScroll()
  }, [formik?.values?.userPassport, handleScroll])
  //===================================================================================================

  return (
    <div className={styles.summary} id={'cart-summary'}>
      <div className={`${styles.block} ${!isFixed ? styles.fixed : ''}`} id={'block-summary'}>
        <div className={styles.desktopBlock}>
          <div className={styles.totalSum}>
            <div className={styles.title}>
              {isTextMobile ? 'итого' : 'итоговая цена'}
              {serviceFee !== undefined && (
                <Tooltip
                  position={tooltipPosition}
                  size={'small'}
                  message={tooltipTitle}
                  type={'tooltip'}
                />
              )}
            </div>

            <b className={styles.price}>{formatSum(totalSum)} ₽</b>
          </div>

          <ul className={styles.orderList}>
            <li className={styles.orderListItem}>
              <b className={styles.label}>Доставка</b>
              <span className={styles.value}>{formatSum(deliveryCost)} ₽</span>
            </li>

            {userBonuses?.discountCount !== null && userBonuses?.discountCount > 0 && (
              <li className={styles.orderListItem}>
                <b className={styles.label}>Скидка</b>
                <span className={styles.value}>- {userBonuses.discountSize}%</span>
              </li>
            )}
          </ul>

          {userBonuses?.discountCount !== null && userBonuses?.discountCount > 0 && (
            <Discount discountCount={userBonuses.discountCount} isUseDiscount={isUseDiscount} />
          )}
        </div>

        {/*{!isMobile && (*/}
        <div className={styles.btnBox} id={'button-box'}>
          <Button
            size="large"
            variant="default"
            type="button"
            hasLoad={appStatus === 'loading'}
            onClick={createOrder}
            disabled={disabled}
          >
            оформить заказ
          </Button>
        </div>

        <div className={styles.floatOrdering}>
          <div className={styles.floatSum}>
            <div className={styles.floatTitle}>
              Итоговая цена
              <Tooltip
                position={mobileTooltipPosition}
                size={'small'}
                message={tooltipTitle}
                type={'tooltip'}
              />
            </div>

            <b className={styles.price}>{formatSum(totalSum)} ₽</b>
          </div>

          <div className={styles.buttonBox}>
            <Button
              size="base"
              variant="default"
              type="button"
              hasLoad={appStatus === 'loading'}
              onClick={createOrder}
              className={styles.floatBtn}
              disabled={disabled}
            >
              оформить
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
