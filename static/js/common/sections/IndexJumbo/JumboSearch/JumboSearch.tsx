import { useEffect, useState } from 'react'

import axios, { AxiosError, CancelTokenSource } from 'axios'

import { useAppDispatch, useAppSelector } from '../../../hooks/customHooks'
import { errorUtils } from '../../../utils/error-utils'

import styles from './JumboSearch.module.scss'

import { fetchProductAPI } from 'api/userAPI/parse-product-api'
import {
  addProductTC,
  getUpdatedCartDataTC,
  selectedPreviewStatus,
  selectedViewCart,
  setAppErrorAC,
  setPreviewStatusAC,
} from 'app/store'
import { AddGoods, OnBoardingTip } from 'common/components'
import { Input } from 'common/ui'
import ProductType from 'types/product-type'

const JumboSearch = (props: { className?: string; hasBg: boolean }) => {
  const dispatch = useAppDispatch()

  const { className = '', hasBg } = props

  const [productLink, setProductLink] = useState<string | undefined>()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const viewCart = useAppSelector(selectedViewCart)
  const [cancelTokenSource, setCancelTokenSource] = useState<CancelTokenSource | null>(null)
  const previewStatus = useAppSelector(selectedPreviewStatus)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const hasGoods = () => {
      return viewCart?.length > 0
    }

    if (isMobile) {
      const floatCart: HTMLDivElement | null = document.querySelector('#floatCart')
      // const isCookieToast = document.body.getAttribute('data-cookie-toast') === 'with-cookie-toast'

      if (previewStatus !== 'hide') {
        document.body.setAttribute('data-jivosite-position', 'changed')
        if (floatCart?.getAttribute('data-hasgoods') === 'true') floatCart.style.zIndex = '0'
      } else if (previewStatus === 'hide' && !hasGoods()) {
        if (floatCart?.getAttribute('data-hasgoods') === 'false') floatCart.style.zIndex = '10'
        document.body.setAttribute('data-jivosite-position', 'default')
      }
    }
  }, [previewStatus, isMobile, viewCart])

  const clearInputHandlerAsync = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Запрос отменен пользователем')
    }
    setProductLink('')

    const timeout = setTimeout(() => {
      dispatch(setPreviewStatusAC('hide'))
      setProduct(null)

      return () => clearTimeout(timeout)
    }, 3000)
  }

  const clearInputHandler = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('Запрос отменен пользователем')
    }
    setProductLink('')
    dispatch(setPreviewStatusAC('hide'))
    setProduct(null)
    setIsLoading(false)
  }

  // console.log('JumboSearch isLoading: ', isLoading)
  const fetchProductHandler = async (link: string) => {
    setIsLoading(true)

    dispatch(setPreviewStatusAC('fetching'))

    const newCancelTokenSource = axios.CancelToken.source()
    const cancelToken = newCancelTokenSource.token

    setCancelTokenSource(newCancelTokenSource)

    try {
      const response = await fetchProductAPI.get(link, cancelToken)

      if (response.data.statusCode === 0) {
        setProduct(response.data)

        setIsLoading(false)
        dispatch(setPreviewStatusAC('show'))
      } else {
        setProductLink('')

        dispatch(setAppErrorAC({ type: 'error', title: response.data.message }))

        if (!isMobile) dispatch(setPreviewStatusAC('hide'))

        const timeout = setTimeout(() => {
          setProduct(null)
          dispatch(setPreviewStatusAC('hide'))

          return () => clearTimeout(timeout)
        }, 3000)
      }
    } catch (e) {
      const err = e as Error | AxiosError<{ error: string }>

      errorUtils(err, dispatch)
      dispatch(setPreviewStatusAC('hide'))
    }
  }

  const addToCartHandler = async (product: ProductType) => {
    // console.log('addToCartHandler')
    dispatch(setPreviewStatusAC('adding'))
    if (product) {
      await dispatch(addProductTC(product))
      dispatch(getUpdatedCartDataTC())
    }

    if (isMobile) {
      clearInputHandlerAsync && clearInputHandlerAsync()
    } else {
      clearInputHandler && clearInputHandler()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      dispatch(setPreviewStatusAC('hide'))
    }
  }, [])

  useEffect(() => {
    return () => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Запрос отменен')
      }
    }
  }, [cancelTokenSource])

  useEffect(() => {
    if (productLink) fetchProductHandler(productLink)
  }, [productLink])

  return (
    <div className={`${className} ${styles.block}`} id={'block'}>
      <Input
        size="search"
        variant={hasBg ? 'default' : 'grey'}
        placeholder="вставьте ссылку на товар"
        hasLoad={false}
        hasClear={true}
        value={productLink}
        onInput={e => setProductLink(e)}
        onClear={clearInputHandler}
        id={'inputBox'}
      />

      <OnBoardingTip />

      <AddGoods
        className={styles.goods}
        product={product as ProductType}
        addToCart={product => addToCartHandler(product)}
        previewStatus={previewStatus}
        id={'goods-preview'}
        clearInputHandler={clearInputHandler}
        clearInputHandlerAsync={clearInputHandlerAsync}
        isLoading={isLoading}
      />
    </div>
  )
}

export default JumboSearch

//types ====================================================================================================