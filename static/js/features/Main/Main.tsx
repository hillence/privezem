import { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { checkTokenInCookie } from '../../api/cookieWorkers'

import styles from './Main.module.scss'

import { fetchUserCartTC } from 'app/store'
import { getFAQTC } from 'app/store/appReducer/thunks'
import { checkUserTC } from 'app/store/userReducer/thanks'
import { FloatCart } from 'common/components'
import { useAppDispatch } from 'common/hooks/customHooks'
import { FaqSection, IndexJumbo } from 'common/sections'

const Main = () => {
  const { token } = useParams<{ token: string }>()
  const dispatch = useAppDispatch()
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
    } else {
      dispatch(fetchUserCartTC())
      dispatch(getFAQTC())
      if (checkTokenInCookie('BearerToken')) {
        dispatch(checkUserTC())
      }
    }

    if (token) {
      document.cookie = `invite_token=${token}; path=/`
    }

    window.onanimationend = function () {
      window.scrollTo(0, 0)
    }
  }, [isFirstLoad])

  return (
    <div className={`${styles.container}`}>
      <IndexJumbo />
      <FaqSection />
      <FloatCart />
    </div>
  )
}

export default Main
