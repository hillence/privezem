import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.scss'

import { Spin } from 'common/ui'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'base' | 'large' | 'xbase'
  variant?: 'transparent' | 'white' | 'default'
  hasLoad?: boolean
  mod?: 'fluid'
  children?: ReactNode
  children2?: ReactNode
  disabled?: boolean
  className?: string
}

const Button = (props: ButtonProps) => {
  const { className, disabled, type, size, variant, hasLoad, mod, onClick, children, children2 } =
    props

  const modification = `${size && styles['btn--size-' + size]} ${
    variant && styles['btn--variant-' + variant]
  } ${mod && styles['btn--mod-' + mod]} ${hasLoad && styles['btn--has-load']}`
  const btnClasses = `${styles.btn} ${className || ''} ${modification}`

  return (
    <button className={btnClasses} onClick={onClick} type={'button' || type} disabled={disabled}>
      {children}
      {children2}
      {hasLoad && <Spin className={styles.loader} />}
    </button>
  )
}

export default Button