import { useEffect, useRef, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import floatCartStyles from '../../components/FloatCart/FloatCart.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'
import { SectionId } from '../../utils/scrollToSection'

import styles from './Toast.module.scss'

import { setCookieNotification } from 'api/cookieWorkers'
import { PATH } from 'app/routes/AppRoutes'
import { selectedPreviewStatus, selectedViewCart, setAppUseCookiesAC } from 'app/store'
import { ReactComponent as IcnAccept } from 'assets/icons/accept-icn.svg'
import { ReactComponent as IcnAlert } from 'assets/icons/alert-icn.svg'
import { ReactComponent as IcnClose } from 'assets/icons/close.svg'

// type CookieStyles = {
//   bottom?: string
// }

const CustomToast = (props: {
  className?: string
  title?: string | null
  type?: 'error' | 'success' | 'info' | 'cookie' | null
  isHidden?: boolean
  handleClose: () => void
  handleReturn?: () => void
}) => {
  const { className = '', title, type, isHidden, handleClose, handleReturn } = props
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  let toastRef = useRef<HTMLDivElement | null>(null)
  const viewCart = useAppSelector(selectedViewCart)
  const [cookieToastStyles, setCookieToastStyles] = useState({})
  const previewStatus = useAppSelector(selectedPreviewStatus)

  const returnHandler = () => {
    if (type === 'info' && handleReturn) handleReturn()
  }

  // console.log('CustomToast type:', type, 'title:', title)
  const mainPage = location.pathname === '/'
  const extraPages =
    location.pathname === PATH.PUBLIC_OFFER ||
    location.pathname === PATH.PRIVACY_POLICY ||
    // location.pathname === PATH.REQUISITES ||
    location.pathname === PATH.PAYMENT_AND_REFUND
  const userAccountPage = /user-account/.test(location.pathname)
  const goodsPage = location.pathname === PATH.ORDERING || location.pathname === PATH.MY_CART

  const hideCookieToast = () => {
    document.body.setAttribute('data-cookie-toast', 'without-cookie-toast')
    setCookieNotification('agreed-with-cookie', 'agreed')
    dispatch(setAppUseCookiesAC({ type: null, title: null }))
  }

  const cookieTitle = () => {
    const handleClick = () => {
      navigate(PATH.PRIVACY_POLICY + '#' + SectionId.COOKIES_POLICY)
      // scrollToSection(SectionId.COOKIES_POLICY, navigate, PATH.PRIVACY_POLICY, -105)
      hideCookieToast()
      handleClose()
    }

    return (
      <>
        Мы используем файлы{' '}
        <span className={styles['title--cookie-last']} onClick={handleClick}>
          cookies
        </span>
      </>
    )
  }

  const closeToastHandler = () => {
    if (!viewCart) {
      document.body.setAttribute('data-jivosite-position', 'default')
      handleClose()
    } else {
      handleClose()
    }
    if (type === 'cookie') {
      hideCookieToast()
    }
  }

  const getToastBottomStyles = () => {
    const floatCartBlock = document.querySelector<HTMLElement>('#floatCart')
    const isFloatCartHidden =
      floatCartBlock?.classList.contains(floatCartStyles['block--hidden']) ?? false
    const isMobile = window.innerWidth < 568
    const isTablet = window.innerWidth < 1024 && window.innerWidth >= 568

    // console.log('isFloatCartHidden', isFloatCartHidden)
    // console.log('type', type)
    // console.log('mainPage', mainPage)
    // console.log('userAccountPage', userAccountPage)
    // console.log('goodsPage', goodsPage)
    // console.log('viewCart.length', !!viewCart.length)
    // console.log('isMobile', isMobile)
    // console.log('isTablet', isTablet)
    // console.log('previewStatus', previewStatus)

    if (
      type !== 'info' &&
      mainPage &&
      isMobile &&
      (previewStatus !== 'hide' || (previewStatus === 'hide' && viewCart.length > 0))
    ) {
      // console.log(
      //   "type !== 'info' &&\n" +
      //     '      mainPage &&\n' +
      //     '      isMobile &&\n' +
      //     "      (previewStatus !== 'hide' || (previewStatus === 'hide' && viewCart.length > 0) - bottom: '64px'"
      // )

      return {
        bottom: '64px',
      }
    } else if (
      !mainPage &&
      (userAccountPage || goodsPage) &&
      isMobile &&
      (previewStatus !== 'hide' || (previewStatus === 'hide' && viewCart.length > 0))
    ) {
      // console.log(
      //   '      !mainPage &&\n' +
      //     '      goodsPage &&\n' +
      //     '      isMobile &&\n' +
      //     "      (previewStatus !== 'hide' || (previewStatus === 'hide' && viewCart.length > 0)) - bottom: 80px"
      // )

      return {
        bottom: '80px',
      }
    } else if (type !== 'info' && isTablet && !isMobile) {
      // console.log("type !== 'info' && isTablet && !isMobile")

      if ((!!viewCart.length && (goodsPage || mainPage)) || userAccountPage) {
        // console.log(
        //   "(!!viewCart.length && (goodsPage || mainPage)) || userAccountPage - bottom: '110px'"
        // )

        return {
          bottom: '110px',
        }
      } else {
        // console.log('else - bottom: 30px')

        return {
          bottom: '30px',
        }
      }
    } else if (
      type !== 'info' &&
      // (userAccountPage || goodsPage) &&
      !isTablet &&
      isMobile
      // isFloatCartHidden
    ) {
      // console.log("type !== 'info' && (userAccountPage || goodsPage) && isMobile - bottom: '80px'")

      if ((!!viewCart.length && (goodsPage || mainPage)) || userAccountPage) {
        // console.log(
        //   "(!!viewCart.length && (goodsPage || mainPage)) || userAccountPage - bottom: '80px'"
        // )

        return {
          bottom: '80px',
        }
      } else {
        // console.log('else - bottom: 0px')

        return {
          bottom: '0px',
        }
      }
    } else if (
      type !== 'info' &&
      viewCart.length > 0 &&
      ((extraPages && isMobile) || (mainPage && isMobile))
    ) {
      // console.log(
      //   "type !== 'info' && ((extraPages && isMobile) || (mainPage && isMobile)) - bottom: '0px'"
      // )

      return {
        bottom: '0px',
      }
    } else if (type !== 'info' && mainPage && isMobile && isFloatCartHidden && !viewCart.length) {
      // console.log(
      //   "type !== 'info' && mainPage && isMobile && isFloatCartHidden && !viewCart.length - bottom: '0px'"
      // )

      return {
        bottom: '0px',
      }
    } else if (type !== 'info' && mainPage && isMobile && !isFloatCartHidden && !!viewCart.length) {
      // console.log(
      //   " type !== 'info' &&\n" +
      //     '      mainPage &&\n' +
      //     '      isMobile &&\n' +
      //     '      !isFloatCartHidden &&\n' +
      //     "      !!viewCart.length - bottom: '64px'"
      // )

      return {
        bottom: '64px',
      }
    }

    // console.log('nothing matched - getCookieStyles()')

    return {}
  } // TODO refactor this
  //===================================================================================================

  useEffect(() => {
    const floatCart = document.querySelector<HTMLElement>('#floatCart')

    if (floatCart && floatCart.classList.contains(floatCartStyles['block--hidden'])) {
      toastRef.current?.classList.remove(styles['isFloat'])
      document.body.setAttribute('data-jivosite-position', 'default')
    } else {
      toastRef.current?.classList.add(styles['isFloat'])
    }
  }, [])

  useEffect(() => {
    const floatCart = document.querySelector<HTMLElement>('#floatCart')

    document.body.setAttribute('data-jivosite-position', 'changed')

    return () => {
      if (
        floatCart &&
        floatCart.classList.contains(floatCartStyles['block--hidden']) &&
        previewStatus !== 'hide'
      ) {
        document.body.setAttribute('data-jivosite-position', 'default')
      }
    }
  }, [])

  useEffect(() => {
    setCookieToastStyles(getToastBottomStyles())
  }, [previewStatus, viewCart, mainPage, location])

  useEffect(() => {
    if (userAccountPage) {
      document.body.setAttribute('data-jivosite-position', 'changed')
    }
    if (extraPages) {
      document.body.setAttribute('data-jivosite-position', 'default')
    }
  }, [location])

  // ${!isHidden ? styles.animateEnter : styles.animateLeave}
  return (
    <div
      className={`${styles.block} ${type ? styles['block--' + type] : ''} 
      ${isHidden ? styles['block--hidden'] : ''} ${className}`}
      ref={toastRef}
      id={`toast-${type}`}
      style={cookieToastStyles}
    >
      <div className={type === 'info' ? `${styles['content--' + type]}` : styles.content}>
        {type === 'success' && (
          <IcnAccept className={`${styles.typeIcn} ${styles['typeIcn--success']}`} />
        )}
        {type === 'error' && (
          <IcnAlert className={`${styles.typeIcn} ${styles['typeIcn--error']}`} />
        )}

        <div className={`${type === 'cookie' ? styles['title--cookie'] : styles.title}`}>
          {type === 'cookie' ? cookieTitle() : title}
        </div>
        {type === 'info' && (
          <>
            <div className={styles.divider}></div>
            <button type={'button'} className={styles.returnBtn} onClick={returnHandler}>
              вернуть
            </button>
          </>
        )}
      </div>

      {type !== 'info' && type !== 'cookie' && (
        <button
          type="button"
          aria-label="Сlose"
          className={styles.close}
          onClick={closeToastHandler}
        >
          <IcnClose />
        </button>
      )}
      {type === 'cookie' && (
        <div onClick={closeToastHandler} className={styles.close}>
          <IcnClose className={styles['closeIcn--cookie']} />
        </div>
      )}
    </div>
  )
}

export default CustomToast