import React, { useEffect, useState } from 'react'

import UserAccount from '../UserAccount'

import styles from './Bonuses.module.scss'

import { getBonusesTC, selectedBonuses } from 'app/store'
import { useAppDispatch, useAppSelector } from 'common'
import { ClipboardComponent, OrderStatusHandler } from 'common/components'
import { Badge } from 'common/ui'

const Bonuses = () => {
  const dispatch = useAppDispatch()
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const bonuses = useAppSelector(selectedBonuses)

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(getBonusesTC())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  return (
    <UserAccount>
      <div className={styles.bonusContainer}>
        <div className={styles.titleBox}>
          <div className={styles.title}>бонусы</div>
          <div className={styles.description}>
            Пригласите своих друзей и получите скидку на заказ за каждого друга
          </div>
          <ClipboardComponent placeholder={bonuses.inviteLink} tooltipText={'ссылка скопирована'} />
        </div>

        {bonuses.discountSize > 0 && bonuses.discountCount > 0 && (
          <div className={styles.discountBox}>
            <div className={styles.innerBox}>
              <div className={styles.discount}>{bonuses.discountSize}% скидка</div>
              <div className={styles.discountText}>осталось: {bonuses.discountCount}</div>
            </div>
          </div>
        )}
        {bonuses.invitedUsers !== null && bonuses?.invitedUsers.length > 0 && (
          <div className={styles.friendsBox}>
            <div className={styles.boxTitle}>
              Приглашённые друзья
              <Badge value={bonuses?.invitedUsers?.length} isActive={true} />
            </div>
            <div className={styles.friendsList}>
              <div className={styles.friendItem}>
                <div className={styles.tableTitle}>email</div>
                <div className={styles.tableTitle}>статус награды</div>
              </div>
              {bonuses.invitedUsers?.map(item => (
                <div key={item.userId} className={styles.friendItem}>
                  <div className={styles.friendEmail}>{item.userEmail}</div>
                  <OrderStatusHandler status={item.status} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </UserAccount>
  )
}

export default Bonuses
