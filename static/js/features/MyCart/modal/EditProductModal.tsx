import React, { useEffect, useState } from 'react'

import styles from './EditProductModal.module.scss'

import { ReactComponent as CloseIcon } from 'assets/icons/close.svg'
import { Button, Input } from 'common/ui'
import NumberInput from 'common/ui/Input/NumberInput'
import ProductType from 'types/product-type'

type Props = {
  isModalOpen: boolean
  closeModalHandler: () => void
  overlayClickHandler: () => void
  product: ProductType
  setChangedProduct: (product: ProductType) => void
  editProductHandler: (product: ProductType) => void
}

export const EditProductModal = (props: Props) => {
  const {
    overlayClickHandler,
    closeModalHandler,
    isModalOpen,
    product,
    setChangedProduct,
    editProductHandler,
  } = props

  const [productState, setProductState] = useState<ProductType>(product)

  useEffect(() => {
    if (product) setProductState(product)
  }, [product])

  const handelInputChange = (value: string | number, field: keyof ProductType) => {
    const updatedData: ProductType = {
      ...productState,
      [field]: value,
    }

    setProductState(updatedData)
  }

  const setChangedProductHandler = () => {
    setChangedProduct(productState)
    editProductHandler(productState)
    closeModalHandler()
  }

  return (
    <>
      {isModalOpen && <div className={styles.overlay} onClick={overlayClickHandler} />}
      {isModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.closeModalIconBox} onClick={closeModalHandler}>
            <CloseIcon />
          </div>

          <form className={styles.modalBox}>
            <div className={styles.header}>Характеристики товара</div>
            <div className={styles.content}>
              <div className={styles.inputBox}>
                <div className={styles.label}>размер:</div>
                <Input
                  className={styles.input}
                  size="small"
                  variant="default"
                  placeholder={'S, M, L, XL, XXL'}
                  hasLoad={false}
                  // label="размер:"
                  value={productState?.productSize}
                  onInput={value => handelInputChange(value, 'productSize')}
                />
              </div>
              <div className={styles.inputBox}>
                <div className={styles.label}>цвет: </div>
                <Input
                  className={styles.input}
                  size="small"
                  variant="default"
                  hasLoad={false}
                  placeholder={'цвет'}
                  // label="цвет:"
                  value={productState?.productColor}
                  onInput={value => handelInputChange(value, 'productColor')}
                />
              </div>
            </div>
          </form>
          <div className={styles.footer}>
            <div className={styles.quantityInput}>
              <NumberInput
                hasLoad={false}
                value={productState?.productQuantity}
                onInput={value => handelInputChange(value, 'productQuantity')}
              />
            </div>

            <Button
              variant={'default'}
              size={'base'}
              onClick={setChangedProductHandler}
              className={styles.submitBtn}
            >
              сохранить
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
