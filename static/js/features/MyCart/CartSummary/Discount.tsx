import React from 'react'

import styles from './Discount.module.scss'

import { getUpdatedCartDataTC } from 'app/store'
import { ReactComponent as DiscountIcon } from 'assets/icons/svgIcons/discountIcon.svg'
import { useAppDispatch } from 'common/hooks/customHooks'
import { Switch } from 'common/ui'

type DiscountPropsType = {
  isUseDiscount: boolean
  discountCount: number
}

export const Discount = (props: DiscountPropsType) => {
  const dispatch = useAppDispatch()
  const handleSwitchChange = (value: boolean) => {
    dispatch(getUpdatedCartDataTC({ isDiscount: value }))
  }
  const times = [2, 3, 4].includes(props.discountCount) ? 'раза' : 'раз'

  return (
    <div className={styles.block}>
      <div className={styles.icon}>
        <DiscountIcon />
      </div>

      <div className={styles.text}>
        <div>Использовать скидку</div>
        <div className={styles.info}>
          осталось {props.discountCount} {times}
        </div>
      </div>

      <div className={styles.switch}>
        <Switch name={'isUseDiscount'} value={props.isUseDiscount} onChange={handleSwitchChange} />
      </div>
    </div>
  )
}
