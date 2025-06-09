import { Dispatch } from 'react'

import axios, { AxiosError } from 'axios'

import { setAppErrorAC } from 'app/store'

interface ErrorResponse {
  message: string
  // Добавьте другие свойства, если они присутствуют в вашем объекте ошибки
}

export const errorUtils = (err: Error | AxiosError<ErrorResponse>, dispatch: Dispatch<any>) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<ErrorResponse>

    if (error && error.code === 'ERR_BAD_REQUEST') {
      const errorMessage = error.response?.data?.message

      if (errorMessage !== undefined) {
        dispatch(setAppErrorAC({ type: 'error', title: errorMessage }))
      }
    } else {
      const errorMessage = error?.message

      if (errorMessage !== undefined) {
        dispatch(setAppErrorAC({ type: 'error', title: errorMessage }))
      }
    }
  } else {
    const error = err as Error
    const errorMessage = error?.message

    if (errorMessage !== undefined) {
      dispatch(setAppErrorAC({ type: 'error', title: errorMessage }))
    }
  }
  // dispatch(checkUserTC())
  // dispatch(checkAdminAuthTC())
}