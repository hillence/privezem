import React, { MouseEvent } from 'react'

import { Badge } from '../../../../../common/ui'

import styles from './OrderProductComponent.module.scss'

import { ImgPreviewType } from 'app/store'
import placeholder from 'assets/icons/imgPlaceholder_60.png'
import { ReactComponent as EditAdminUser } from 'assets/icons/svgIcons/editAdminUser.svg'
import { calculateItemSum, formatSum } from 'common'
import { LogoSelectorRC } from 'common/components'
import { AvailableBrandEnum } from 'types/available-brand-enum'
import ProductType from 'types/product-type'

type OrderProductPropsType = {
  items: ProductType[]
  editItemHandler?: (
    e: MouseEvent<HTMLDivElement>,
    itemId: string,
    shopName: AvailableBrandEnum,
    disabled: boolean
  ) => void
  shopName: AvailableBrandEnum
  disabled: boolean
  showImgPreviewHandler: (data: ImgPreviewType) => void
}

export const OrderProductComponent = (props: OrderProductPropsType) => {
  const { items, editItemHandler, shopName, disabled, showImgPreviewHandler } = props
  const totalSum = calculateItemSum(items)

  const clickHandler = (e: MouseEvent<HTMLDivElement>, fileUrl: string | undefined) => {
    e.stopPropagation()
    e.preventDefault()
    fileUrl && window.open(fileUrl, '_blank')
  }

  const onImgHandler = (e: MouseEvent<HTMLImageElement>, item: ProductType) => {
    e.stopPropagation()
    const imgPreviewData: ImgPreviewType = {
      productName: item.productName,
      productImg: item.productImg,
      item: item.item,
    }

    showImgPreviewHandler(imgPreviewData)
  }

  return (
    <div className={styles.shoppingList}>
      <div className={styles.shoppingListHeader}>
        <div className={styles.logo}>
          <LogoSelectorRC shopName={shopName} />
          <div className={styles.goodsCount}>
            <Badge value={items.length} isActive={true} />
          </div>
        </div>
        <div className={styles.totalSum}>
          <span>€ {formatSum(totalSum.euro)} /&nbsp;</span>
          <span>{formatSum(totalSum.rubles)} ₽</span>
        </div>
      </div>
      <div className={styles.productList}>
        {items.map(item => {
          let productImg

          if (item.productImg) {
            productImg = item.productImg
          }

          return (
            <div className={styles.productListItems} key={item.productId}>
              <div className={styles.itemContent}>
                <div className={styles.productBox}>
                  <img
                    src={productImg}
                    alt={item.productName}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                      const target = e.target as HTMLImageElement

                      target.src = placeholder
                    }}
                    onClick={e => onImgHandler(e, item)}
                  />
                  <div
                    className={styles.itemDescriptionBox}
                    onClick={e => clickHandler(e, item.productLink)}
                  >
                    <div className={styles.itemTitle}>
                      <div className={styles.itemText}>{item.productName}</div>
                      <div className={styles.itemText}>
                        {item.productSize || item.productColor
                          ? `(${item.productSize || ''}${
                              item.productSize && item.productColor ? ', ' : ''
                            }${item.productColor || ''})`
                          : null}
                      </div>
                    </div>
                    <div className={styles.itemPrice}>
                      € {formatSum(item.productPrice.euro)} / {formatSum(item.productPrice.rubles)}{' '}
                      ₽
                    </div>
                  </div>
                </div>
                {editItemHandler && (
                  <div
                    className={`${styles.editImg} ${disabled ? styles['-disabled'] : ''}`}
                    onClick={e => editItemHandler(e, item.productId, shopName, disabled)}
                  >
                    <EditAdminUser />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
