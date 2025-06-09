import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { checkTokenInCookie } from '../../api/cookieWorkers'
import { AvailableBrandEnum } from '../../types/available-brand-enum'
import CartType from '../../types/cart-type'

import { CartList } from './CartList/CartList'
import { CartSummary } from './CartSummary/CartSummary'
import { CartTitle } from './CartTitle/CartTitle'
import { EditProductModal } from './modal/EditProductModal'
import styles from './MyCart.module.scss'

import { PATH } from 'app/routes/AppRoutes'
import {
  addProductTC,
  checkUserTC,
  editProductTC,
  fetchUserCartTC,
  getBonusesTC,
  getUpdatedCartDataTC,
  ImgPreviewType,
  removeProductTC,
  selectedCart,
  selectedUserId,
  setImgPreviewDataAC,
  setRootModalDataAC,
} from 'app/store'
import { ReactComponent as EmptyCartIcon } from 'assets/icons/svgIcons/bagIcon.svg'
import width from 'assets/styles/widthContainer.module.scss'
import { isEmptyCart, useAppDispatch, useAppSelector } from 'common'
import { CenterModal, ImgPreviewModal } from 'common/components'
import { Button } from 'common/ui'
import ProductType from 'types/product-type'

const MyCart = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [changedProduct, setChangedProduct] = useState<ProductType | null>(null)
  // const [isFixed, setIsFixed] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isImgPreviewOpen, setIsImgPreviewOpen] = useState<boolean>(false)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
  const [initialOpenedStore, setInitialOpenedStore] = useState<AvailableBrandEnum | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // const currentBrowser = getBrowserInfo()
  // const isAllowDownloadExtension = currentBrowser === 'Google_Chrome_Desktop' //todo - fix it for different browsers
  const cart = useAppSelector(selectedCart)
  const user = useAppSelector(selectedUserId)
  // const extensionId = useAppSelector(selectedExtensionId)
  // const rootModalData = useAppSelector(selectedRootModalData)
  // const currentBrowser = getBrowserInfo()

  // const isEmptyCart = cart && cart.farfetch?.length === 0 && cart.yoox?.length === 0
  // const chromeExtensionPageUrl = `https://chromewebstore.google.com/u/2/detail/ohreally/${extensionId}`
  // const firefoxExtensionPageUrl = `https://addons.mozilla.org/ru/firefox/addon/ohreally/`
  const hasGoods = () => cart && !isEmptyCart(cart)

  const editProductHandler = (product: ProductType) => {
    setChangedProduct(product)
    dispatch(editProductTC(product))
  }

  const removeProductHandler = (product: ProductType) => {
    dispatch(removeProductTC(product))
  }

  const openModalHandler = (product: ProductType) => {
    setIsModalOpen(true)
    setChangedProduct(product)
    document.body.classList.add('modal-open')
  }

  const openLoginModalHandler = () => {
    dispatch(setRootModalDataAC({ isOpen: true, modalType: 'login', direction: 'right' }))
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
    document.body.classList.remove('modal-open')
    dispatch(setRootModalDataAC({ isOpen: false, modalType: null, direction: null }))
  }

  const setOrderHandler = () => {
    if (!user) {
      openLoginModalHandler()
    } else {
      navigate(`/ordering`)
    }
  }

  const showImgPreviewHandler = (data: ImgPreviewType) => {
    dispatch(setImgPreviewDataAC(data))
    setIsImgPreviewOpen(true)
  }
  const closeImgPreviewHandler = () => {
    setIsImgPreviewOpen(false)
  }

  const getGoodsFromExtensionHandler = async (data: CartType) => {
    try {
      const addProductTasks: any[] = []

      Object.entries(data).forEach(([key, items]) => {
        if (Array.isArray(items)) {
          addProductTasks.push(
            ...items.map(async (t: ProductType) => {
              await dispatch(addProductTC(t))
            })
          )
        }
      })

      await Promise.allSettled(addProductTasks)
      dispatch(getUpdatedCartDataTC())

      window.postMessage({ action: 'CLEAR_STORAGE' })
    } catch (error) {
      console.error('Ошибка при добавлении товаров:', error)
    }
  }

  useEffect(() => {
    document.body.setAttribute('data-jivosite-position', hasGoods() ? 'changed' : 'default')
  }, [cart])

  useEffect(() => {
    if (user && !isFirstLoad) {
      dispatch(getBonusesTC())
    }
  }, [user, isFirstLoad])

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(fetchUserCartTC())
      // compareCartLifeTime(dispatch) // сравниваем время последнего обновления корзины с текущим временем и если разница больше 24 часов, то очищаем корзину
      if (checkTokenInCookie('BearerToken')) dispatch(checkUserTC())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  useEffect(() => {
    const productHandler = (event: MessageEvent) => {
      if (event.data.action === 'RECEIVE_DATA_FROM_EXTENSION') {
        getGoodsFromExtensionHandler(event.data.data).then(r => r)
      }
    }
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Вызовите функцию при первой загрузке страницы

    window.addEventListener('message', productHandler)

    return () => {
      window.removeEventListener('message', productHandler)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    window.postMessage({ action: 'CHECK_BUTTON' })
  }, [cart])

  return (
    <>
      <section className={styles.section} id={'cart-section'}>
        <div className={width.base}>
          {hasGoods() && (
            <>
              {isMobile ? (
                <>
                  <CartTitle cart={cart} setInitialOpenedStore={setInitialOpenedStore} />
                  <div className={styles.cart} id={'cart'}>
                    <div className={styles['list-box']}>
                      <div className={styles.list} id={'cart-list'}>
                        <CartList
                          cart={cart}
                          openModalHandler={openModalHandler}
                          removeProductHandler={removeProductHandler}
                          editProductHandler={editProductHandler}
                          showImgPreviewHandler={showImgPreviewHandler}
                          initialOpenedStore={initialOpenedStore}
                        />
                      </div>
                    </div>

                    <CartSummary createOrder={setOrderHandler} cart={cart} />
                  </div>
                </>
              ) : (
                <div className={styles.cart} id={'cart'}>
                  <div className={styles['list-box']}>
                    <CartTitle cart={cart} setInitialOpenedStore={setInitialOpenedStore} />
                    <div className={styles.list} id={'cart-list'}>
                      <CartList
                        cart={cart}
                        openModalHandler={openModalHandler}
                        removeProductHandler={removeProductHandler}
                        editProductHandler={editProductHandler}
                        showImgPreviewHandler={showImgPreviewHandler}
                        initialOpenedStore={initialOpenedStore}
                      />
                    </div>
                  </div>

                  <CartSummary createOrder={setOrderHandler} cart={cart} />
                </div>
              )}
            </>
          )}

          {!hasGoods() && (
            <div className={styles.emptyCart}>
              <div className={styles.description}>
                <EmptyCartIcon />
                <h4 className={styles.pageTitle}>В корзине нет товаров</h4>
                <p>Перейдите на главную, чтобы добавить новые товары </p>
              </div>

              <div className={styles.buttonBox} id={'button-box'}>
                <Button
                  variant={'default'}
                  size={'large'}
                  type={'button'}
                  onClick={() => navigate(PATH.MAIN)}
                >
                  перейти на главную
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
      {/*it's only for mobile version*/}
      <EditProductModal
        isModalOpen={isModalOpen}
        overlayClickHandler={closeModalHandler}
        closeModalHandler={closeModalHandler}
        product={changedProduct!}
        setChangedProduct={setChangedProduct}
        editProductHandler={editProductHandler}
      />
      {/*----------------------------------------------*/}

      <CenterModal isOpen={isImgPreviewOpen} closeHandler={closeImgPreviewHandler}>
        <ImgPreviewModal />
      </CenterModal>
    </>
  )
}

export default MyCart
