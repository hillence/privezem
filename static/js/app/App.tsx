import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router-dom'

import { getTokenFromCookie } from '../api/cookieWorkers'
import { useAppDispatch } from '../common'

import { AppRoutes, PATH } from './routes/AppRoutes'
import { setAppUseCookiesAC } from './store'

import { MainLayout } from 'common/components'
import { Preloader } from 'common/ui'

import './App.css'

const App = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [isDomLoaded, setIsDomLoaded] = useState<boolean>(false)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
  const [isShowPreloader, setIsShowPreloader] = useState<boolean>(true)
  const excludeHeaderFooterPaths = [
    PATH.ADMIN_PANEL,
    PATH.ADMIN_PANEL + PATH.ADMIN_ORDER_DETAILS,
    PATH.NOT_FOUND,
  ]

  const excludedPreloaderPaths = [
    PATH.NOT_FOUND,
    PATH.ADMIN_PANEL_BLOCKED_ACCOUNT,
    PATH.ADMIN_PANEL,
    PATH.ADMIN_PANEL_BUYER,
    PATH.ADMIN_PANEL_MANAGER,
    PATH.ADMIN_PANEL_ADMIN,
    PATH.ADMIN_PANEL_ADMIN_BUYER_ORDER,
    PATH.ADMIN_PANEL_ADMIN_BUYER_ORDER + PATH.ADMIN_ORDER_DETAILS,
    PATH.ADMIN_PANEL_ADMIN + PATH.ADMIN_ORDER_DETAILS,
    PATH.ORDERING_SUCCESSFUL,
    PATH.ORDERING_FAILED,
    PATH.EMAIL_VERIFY,
  ]

  const isPreloaderAllowed = !excludedPreloaderPaths.some(path => location.pathname.includes(path))

  const allowedPages = !excludeHeaderFooterPaths.some(path => location.pathname.includes(path))
  let layoutComponent

  layoutComponent = allowedPages ? (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  ) : (
    <AppRoutes />
  )

  const cookieToastHandler = () => {
    const isAgreed = getTokenFromCookie('agreed-with-cookie')

    if (isAgreed !== 'agreed' && allowedPages) {
      document.body.setAttribute('data-cookie-toast', 'with-cookie-toast')
      dispatch(setAppUseCookiesAC({ type: 'cookie', title: 'null' }))
    }
  }

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
    } else {
      cookieToastHandler()
      setIsDomLoaded(true)

      const body = document.querySelector('body')

      if (body && !excludedPreloaderPaths) body.classList.add('load')

      const timeout = setTimeout(() => {
        setIsShowPreloader(false)
        if (body && !excludedPreloaderPaths) body.classList.remove('load')

        return () => clearTimeout(timeout)
      }, 5000)
    }
  }, [isFirstLoad])

  // useEffect(() => {
  //   compareCartLifeTime(dispatch)
  // }, [location.pathname])

  return (
    <>
      {isShowPreloader && isPreloaderAllowed && <Preloader isDomLoaded={isDomLoaded} />}
      {layoutComponent}
    </>
  )
}

export default App