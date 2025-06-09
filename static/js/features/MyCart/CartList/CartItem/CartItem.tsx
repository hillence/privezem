import React, { useState } from 'react'

import { Skeleton } from '@mui/material'

import styles from './CartItem.module.scss'

import { ImgPreviewType } from 'app/store'
import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { Button, Image, Input } from 'common/ui'
import NumberInput from 'common/ui/Input/NumberInput'
import { formatSum } from 'common/utils/format-sum'
import ProductType from 'types/product-type'

type Props = {
  product: ProductType
  isLoading: boolean
  hasLoad?: boolean
  openModalHandler: (product: ProductType) => void
  removeProduct: (product: ProductType) => void
  editProductHandler: (product: ProductType) => void
  noticeOpened?: string | null
  setNoticeOpened?: (value: string | null) => void
  showImgPreviewHandler: (data: ImgPreviewType) => void
}

const CartItem = (props: Props) => {
  const {
    product,
    isLoading,
    hasLoad,
    openModalHandler,
    removeProduct,
    editProductHandler,
    setNoticeOpened,
    noticeOpened,
    showImgPreviewHandler,
  } = props
  const [productState, setProductState] = useState<ProductType>(product)

  const setProductHandler = (updatedValues: Partial<ProductType>) => {
    setProductState(prevState => {
      return {
        ...prevState,
        ...updatedValues,
      }
    })
  }

  const openNoteHandler = (productId: string | null) => {
    if (setNoticeOpened && noticeOpened === null) {
      setNoticeOpened(productId)
    } else if (setNoticeOpened && noticeOpened === productId) {
      return
    } else if (setNoticeOpened && noticeOpened !== productId) {
      setNoticeOpened(productId)
    }
  }

  const clickNoticeHandler = (productId: string) => {
    if (setNoticeOpened && noticeOpened === productId) {
      setNoticeOpened(null)
    } else if (setNoticeOpened && noticeOpened !== productId) {
      setNoticeOpened(productId)
    }
  }

  const onImgClickHandler = () => {
    if (product) {
      const data: ImgPreviewType = {
        productImg: product.productImg,
        productName: product.productName,
        item: product.item,
      }

      showImgPreviewHandler(data)
    }
  }

  const isCurrent = noticeOpened !== null && noticeOpened === product.productId

  return (
    <>
      {productState && (
        <div className={styles.block}>
          <div className={styles.avatar} onClick={onImgClickHandler}>
            {isLoading ? (
              <Skeleton variant="rectangular" className={styles.skeleton} width={60} height={60} />
            ) : (
              <Image src={productState.productImg!} alt={productState.productName} />
            )}
          </div>

          <div className={styles.product}>
            {isLoading ? (
              <>
                <Skeleton
                  variant="rectangular"
                  className={styles.skeleton}
                  width={160}
                  height={15}
                />
                <Skeleton
                  variant="rectangular"
                  className={styles.skeleton}
                  width={105}
                  height={15}
                />
              </>
            ) : (
              <div className={styles.productMain}>
                <div className={styles.productName}>
                  <p>{productState?.productName}</p>
                </div>

                <div className={styles.productSum}>
                  € {formatSum(productState?.productPrice.euro)} /{' '}
                  {formatSum(productState?.productPrice.rubles)} ₽
                </div>
              </div>
            )}
          </div>

          <div className={styles.actions}>
            {isLoading && productState ? (
              <Skeleton variant="rectangular" className={styles.skeleton} width={120} height={44} />
            ) : (
              <div className={styles.inputSize}>
                <Input
                  size="small"
                  variant="default"
                  hasLoad={false}
                  label="размер:"
                  placeholder={'S, M, L, XL, XXL'}
                  value={productState?.productSize}
                  onInput={value => {
                    setProductHandler({ productSize: value })
                    // openNoteHandler(product.productId)
                  }}
                  onFocus={() => openNoteHandler(product.productId)}
                  onBlur={() => openNoteHandler(null)}
                />
              </div>
            )}

            {isLoading ? (
              <Skeleton variant="rectangular" className={styles.skeleton} width={120} height={44} />
            ) : (
              <div className={styles.inputColor}>
                <Input
                  size="small"
                  variant="default"
                  hasLoad={false}
                  placeholder={'чёрный, белый, красный'}
                  label="цвет:"
                  value={productState?.productColor}
                  onInput={value => {
                    setProductHandler({ productColor: value })
                    // openNoteHandler(product.productId)
                  }}
                  onFocus={() => openNoteHandler(product.productId)}
                  onBlur={() => openNoteHandler(null)}
                />
              </div>
            )}

            {isLoading ? (
              <Skeleton variant="rectangular" className={styles.skeleton} width={120} height={44} />
            ) : (
              <div className={styles.inputQuantity}>
                <NumberInput
                  hasLoad={false}
                  value={productState?.productQuantity}
                  onInput={value => {
                    setProductHandler({ productQuantity: value })
                    openNoteHandler(product.productId)
                  }}
                />
              </div>
            )}
          </div>

          <div className={styles.removeBtn} onClick={() => removeProduct(productState)}>
            <CloseIcon />
          </div>

          <div className={styles.noteBlock}>
            <div
              className={styles.noteBlockText}
              onClick={() => clickNoticeHandler(product.productId)}
            >
              <span
                className={`${styles.plusIcon} ${isCurrent ? styles['plusIcon--active'] : ''}`}
              />
              Примечание
            </div>

            <div
              className={`${styles.productNote} ${isCurrent ? styles['productNote--active'] : ''}`}
            >
              <Input
                value={productState?.productComment}
                onInput={value => setProductHandler({ productComment: value })}
                placeholder="введите текст"
                size="small"
                variant="default"
                hasLoad={false}
                hasClear={true}
                clearStyle={'white'}
              />

              <Button
                className={styles.addGoodsBtn}
                size="base"
                variant="white"
                type="button"
                disabled={hasLoad}
                hasLoad={hasLoad}
                onClick={() => editProductHandler(productState)}
              >
                сохранить
              </Button>
            </div>
          </div>

          <div className={styles.mobileActions}>
            <ul className={styles.badgeList}>
              {product.productQuantity && (
                <li className={styles.badge}>{`кол-во: ${product.productQuantity}`}</li>
              )}
              {product.productColor && (
                <li className={styles.badge}>{`цвет: ${product.productColor}`}</li>
              )}
              {product.productSize && (
                <li className={styles.badge}>{`размер: ${product.productSize}`}</li>
              )}
            </ul>

            <button className={styles.editBtn} onClick={() => openModalHandler(product)}>
              Изменить
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default CartItem
