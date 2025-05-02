import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/customHooks'
import { Portal, Toast } from '../index'

import {
  addProductTC,
  getUpdatedCartDataTC,
  selectedAppError,
  selectedAppInfo,
  selectedAppSuccess,
  selectedAppUseCookies,
  selectedDeletedProduct,
  setAppErrorAC,
  setAppInfoAC,
  setAppSuccessAC,
  setDeletedProductAC,
} from 'app/store'

export const CustomSnackBar = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [shouldClearFeedbackAndError, setShouldClearFeedbackAndError] = useState<boolean>(false)
  const [toastTitle, setToastTitle] = useState<string | null>(null)
  const [toastType, setToastType] = useState<'error' | 'success' | 'info' | 'cookie' | null>(null)
  const dispatch = useAppDispatch()
  const appError = useAppSelector(selectedAppError)
  const feedBack = useAppSelector(selectedAppSuccess)
  const infoMessage = useAppSelector(selectedAppInfo)
  const cookieMessage = useAppSelector(selectedAppUseCookies)
  const deletedProduct = useAppSelector(selectedDeletedProduct)
  const title = infoMessage?.title || appError?.title || feedBack?.title
  const type = infoMessage?.type || appError?.type || feedBack?.type || cookieMessage?.type
  const existingToastTimeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const handleClose = () => {
    setShouldClearFeedbackAndError(true)
    setIsHidden(true)
  }

  const handleReturn = async () => {
    if (deletedProduct) {
      dispatch(addProductTC(deletedProduct))
      dispatch(getUpdatedCartDataTC())
    }
    dispatch(setAppInfoAC({ title: null, type: null }))
  }

  const showToast = async () => {
    await new Promise((resolve, reject) => {
      if (!isHidden) {
        existingToastTimeouts.current.forEach(timeoutId => clearTimeout(timeoutId))
        existingToastTimeouts.current = []
        setIsHidden(true)
        const hideTimeout = setTimeout(() => {
          resolve(true)
        }, 500)

        existingToastTimeouts.current.push(hideTimeout)
      } else {
        reject(false)
      }
    })
      .then(() => {
        showNewToast()
      })
      .catch(() => {
        showNewToast()
      })
  }

  const showNewToast = async () => {
    if (appError?.title || feedBack?.title || infoMessage?.title) {
      setIsHidden(false)
      setToastTitle(title ? title : null)
      setToastType(type ? type : null)
      existingToastTimeouts.current.forEach(timeoutId => clearTimeout(timeoutId))
      existingToastTimeouts.current = []
      const currentTimeOut = setTimeout(() => {
        handleClose()
      }, 3000)

      existingToastTimeouts.current.push(currentTimeOut)
    } else if (cookieMessage?.title) {
      setIsHidden(false)
      setToastTitle(cookieMessage.title)
      setToastType(cookieMessage.type)
    }
  }

  useEffect(() => {
    showToast().then(r => r)
  }, [appError, feedBack, infoMessage, cookieMessage])

  useEffect(() => {
    if (shouldClearFeedbackAndError) {
      const timeout = setTimeout(() => {
        if (feedBack?.title !== null) dispatch(setAppSuccessAC({ title: null, type: null }))
        if (appError?.title !== null) dispatch(setAppErrorAC({ title: null, type: null }))
        if (infoMessage?.title !== null) dispatch(setAppInfoAC({ title: null, type: null }))
        if (deletedProduct) dispatch(setDeletedProductAC(null))
        setShouldClearFeedbackAndError(false)

        return () => clearTimeout(timeout)
      }, 1000)
    }
  }, [shouldClearFeedbackAndError])

  return (
    <Portal>
      <Toast
        title={toastTitle}
        type={toastType}
        isHidden={isHidden}
        handleClose={handleClose}
        handleReturn={handleReturn}
      />
    </Portal>
  )
}