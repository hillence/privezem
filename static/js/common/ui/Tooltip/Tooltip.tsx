import React, { useState } from 'react'

import styles from './Tooltip.module.scss'

import { ReactComponent as TooltipIcon } from 'assets/icons/tooltipIcon.svg'

type Props = {
  message: string
  position: 'right' | 'right-bottom' | 'top' | 'left'
  type: 'tooltip' | 'clipboard'
  size?: 'base' | 'small'
  isOpen?: boolean
  containerClassName?: string
  tooltipClassName?: string
}

const Tooltip = (props: Props) => {
  const { message, position, type, size, isOpen, containerClassName, tooltipClassName } = props

  const [showToolTip, setShowToolTip] = useState<boolean>(isOpen!)

  const onMouseEnterHandler = () => {
    setShowToolTip(true)
  }

  const onMouseLeaveHandler = () => {
    setShowToolTip(false)
  }

  return (
    <div
      className={`${containerClassName ?? ''} ${styles.container} ${styles['size-' + size] || ''}`}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={() => setShowToolTip(!showToolTip)}
    >
      {type === 'tooltip' ? <TooltipIcon className={styles.tooltipIcon} /> : null}

      {showToolTip && (
        <div
          className={`${tooltipClassName ?? ''} ${styles[type]} ${
            styles[type + '--position-' + position]
          } `}
        >
          <span className={styles.tooltipText}>{message}</span>
        </div>
      )}
    </div>
  )
}

export default Tooltip