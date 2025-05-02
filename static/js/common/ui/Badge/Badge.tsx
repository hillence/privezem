import React from 'react'

import styles from './Badge.module.scss'

type Props = {
  value: string | number
  isActive: boolean
}
export const Badge = (props: Props) => {
  return (
    <div className={props.isActive ? `${styles.badge} ${styles['badge--active']}` : styles.badge}>
      <span>{props.value}</span>
    </div>
  )
}