import React, { useState } from 'react'

import { AvailableBrandEnum } from '../../../types/available-brand-enum'

import CartItem from './CartItem/CartItem'
import styles from './CartList.module.scss'

import { ImgPreviewType } from 'app/store'
import { selectedAppStatus } from 'app/store/selectors/appSelectors'
import { calculateStoreSum } from 'common'
import { CartListHeader } from 'common/components'
import { useAppSelector } from 'common/hooks/customHooks'
import CartType from 'types/cart-type'
import ProductType from 'types/product-type'

type Props = {
  cart: CartType
  openModalHandler: (product: ProductType) => void
  removeProductHandler: (product: ProductType) => void
  editProductHandler: (product: ProductType) => void
  showImgPreviewHandler: (data: ImgPreviewType) => void
  initialOpenedStore: AvailableBrandEnum | null
}

export const CartList = (props: Props) => {
  const {
    cart,
    openModalHandler,
    removeProductHandler,
    editProductHandler,
    showImgPreviewHandler,
    initialOpenedStore,
  } = props
  const isLoading = useAppSelector(selectedAppStatus)

  const [noticeOpened, setNoticeOpened] = useState<null | string>(null)

  return (
    <div className={styles.block}>
      {Object.entries(cart).map(([store, items]) => (
        <CartListHeader
          type={store as AvailableBrandEnum}
          quantity={items?.length}
          totalSum={calculateStoreSum(items)}
          initialOpen={initialOpenedStore === store}
          expanded={items?.length > 0 ?? false}
          key={store}
        >
          <div className={styles.cartItems}>
            {items?.map(item => (
              <CartItem
                noticeOpened={noticeOpened}
                setNoticeOpened={setNoticeOpened}
                product={item}
                isLoading={false}
                hasLoad={isLoading === 'loading'}
                key={item.productId}
                openModalHandler={openModalHandler}
                removeProduct={(product: ProductType) => removeProductHandler(product)}
                editProductHandler={editProductHandler}
                showImgPreviewHandler={showImgPreviewHandler}
              />
            ))}
          </div>
        </CartListHeader>
      ))}
    </div>
  )
}
