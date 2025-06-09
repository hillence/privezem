import Cookies from 'js-cookie'

import CartType from '../../types/cart-type'

import { clearCartTC } from 'app/store'
import { AppThunkDispatch } from 'app/store/types'

export const COOKIE_LIFE_TIME_NAME = 'cart-life-time'

export function setCookieTime(name: string, value: string, days: number) {
  Cookies.set(name, value, { expires: days })
}

export function getCookieTime(name: string): string | undefined {
  return Cookies.get(name)
}

export function removeCookieTime(name: string) {
  Cookies.remove(name)
}

export function compareCartLifeTime(dispatch: AppThunkDispatch, cart: CartType) {
  const cookieTime = getCookieTime(COOKIE_LIFE_TIME_NAME)
  const isEmptyCart = Object.values(cart).every(item => item.length === 0)

  // console.log('cookieTime', cookieTime, 'isEmptyCart', isEmptyCart)

  if (cookieTime === undefined && !isEmptyCart) {
    dispatch(clearCartTC())
    window.postMessage({ action: 'CLEAR_STORAGE' })
  }

  if (cookieTime && !isEmptyCart) {
    const currentTime = Date.now()
    const timeDifference = currentTime - Number(cookieTime)

    const timeDifferenceInHours = timeDifference / (1000 * 60 * 60)

    // console.log('timeDifferenceInHours >= 24', timeDifferenceInHours >= 24)
    // console.log('timeDifferenceInHours', timeDifferenceInHours)

    if (timeDifferenceInHours !== null && timeDifferenceInHours >= 24) {
      dispatch(clearCartTC())
      window.postMessage({ action: 'CLEAR_STORAGE' })
      removeCookieTime(COOKIE_LIFE_TIME_NAME)
    }
  }
}
