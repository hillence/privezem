import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../app/routes/AppRoutes'

import styles from './UserAccount.module.scss'

import { selectedUserId } from 'app/store'
import { MobileAccountMenu, UserAccountMenu } from 'common/components'
import { useAppSelector } from 'common/hooks/customHooks'

type UserAccountPropsType = {
  children: React.ReactNode
}

const UserAccount = (props: UserAccountPropsType) => {
  const { children } = props
  // const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // const activeTab = useAppSelector(activeUserAccountTab)
  const [isShowMobileMenu, setIsShowMobileMenu] = useState<boolean>(false)

  const userId = useAppSelector(selectedUserId)

  useEffect(() => {
    if (!userId) {
      navigate(PATH.MAIN)
    }
  }, [userId])

  useEffect(() => {
    const handleResize = () => {
      setIsShowMobileMenu(window.innerWidth <= 1024)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.container}>
      {!isShowMobileMenu ? (
        <div className={styles.accountMenuBox}>
          <UserAccountMenu />
        </div>
      ) : (
        <MobileAccountMenu />
      )}
      <div className={styles.accountContent}>{children}</div>
    </div>
  )
}

export default UserAccount
