import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '../../../common'
import { CenterModal, ConfirmModal } from '../../../common/components'
import { Badge, Button } from '../../../common/ui'
import { AvailableBrandEnum } from '../../../types/available-brand-enum'
import CartType from '../../../types/cart-type'

import styles from './CartTitle.module.scss'

import { clearCartTC } from 'app/store'
import { ReactComponent as ClearCartIcon } from 'assets/icons/svgIcons/deleteIcon.svg'

type Props = {
  cart: CartType
  setInitialOpenedStore: (value: AvailableBrandEnum) => void
}

export const CartTitle = (props: Props) => {
  const { cart, setInitialOpenedStore } = props

  const dispatch = useAppDispatch()

  const [goodsCount, setGoodsCount] = useState<number>(0)
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState<boolean>(false)

  useEffect(() => {
    setGoodsCount(getTotalProducts(cart))
  }, [cart])

  useEffect(() => {
    const firstNonEmptyStore = Object.entries(cart).find(([_, items]) => items?.length > 0)

    if (firstNonEmptyStore) {
      setInitialOpenedStore(firstNonEmptyStore[0] as AvailableBrandEnum)
    }
  }, [])

  function getTotalProducts(cart: CartType): number {
    const currentArray = Object.values(cart) ?? []

    if (currentArray.length === 0) {
      return 0
    } else {
      return currentArray.reduce((total, currentArray) => total + currentArray?.length, 0)
    }
  }

  const clearCartHandler = () => {
    dispatch(clearCartTC())
    closeHandler()
  }

  const closeHandler = () => {
    setIsClearCartModalOpen(false)
  }

  const openHandler = () => {
    setIsClearCartModalOpen(true)
  }

  return (
    <>
      <div className={styles.header} id={'cart-title'}>
        <div className={styles.summary}>
          <h4 className={styles.title}>корзина</h4>
          <Badge value={goodsCount} isActive={true} />
        </div>

        <Button variant={'transparent'} className={styles.clear} onClick={openHandler}>
          <ClearCartIcon />
          <span>удалить всё</span>
        </Button>
      </div>
      <CenterModal
        isOpen={isClearCartModalOpen}
        closeHandler={closeHandler}
        className={styles.modal}
      >
        <ConfirmModal
          cancelHandler={closeHandler}
          deleteHandler={clearCartHandler}
          title={'Вы действительно желаете очистить корзину?'}
        />
      </CenterModal>
    </>
  )
}
