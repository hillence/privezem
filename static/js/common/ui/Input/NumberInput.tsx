import React, { useEffect, useState } from 'react'

import { ReactComponent as MinusIcon } from '../../../assets/icons/svgIcons/minusIcon.svg'
import { ReactComponent as PlusIcon } from '../../../assets/icons/svgIcons/plusIcon.svg'

import styles from './NumberInput.module.scss'

type Props = {
  value?: number
  onInput: (value: number) => void
  errorText?: string
  hasError?: boolean
  hasLoad?: boolean
  mod?: string
}

function NumberInput(props: Props) {
  const { value, errorText, onInput, hasError, hasLoad } = props

  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if (value) setQuantity(value)
  }, [value])

  const handleMinusClick = () => {
    if (quantity > 1) {
      const updatedQuantity = Math.max(quantity - 1, 0)

      setQuantity(updatedQuantity)
      onInput(updatedQuantity)
    }
  }

  const handlePlusClick = () => {
    if (quantity < 999) {
      const updatedQuantity = Math.min(quantity + 1, 999)

      setQuantity(updatedQuantity)
      onInput(updatedQuantity)
    }
  }

  const addDisableClass = (buttonType: 'minus' | 'plus') => {
    if (buttonType === 'minus') {
      return quantity <= 1 ? styles['quantityBtn--disabled'] : ''
    } else if (buttonType === 'plus') {
      return quantity >= 999 ? styles['quantityBtn--disabled'] : ''
    }

    return ''
  }

  return (
    <div className={`${styles.block}`}>
      <div className={styles.wrapper}>
        <button
          type="button"
          onClick={handleMinusClick}
          className={`${styles.quantityBtn} ${addDisableClass('minus')}`}
        >
          <MinusIcon className={styles.iconMinus} />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={e => {
            const value = parseInt(e.target.value, 10)

            if (!isNaN(value) && value >= 0 && value <= 999) {
              setQuantity(value)
            }
          }}
          className={`${styles.input} ${quantity !== 0 ? 'input--active' : ''}
          ${hasError ? styles['input--has-error'] : ''} 
          ${hasLoad ? styles['input--has-load'] : ''}`}
        />

        <button
          type="button"
          onClick={handlePlusClick}
          className={`${styles.quantityBtn} ${addDisableClass('plus')}`}
        >
          <PlusIcon className={`${styles.iconPlus} ${addDisableClass('plus')}`} />
        </button>
      </div>

      {hasError && errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  )
}

export default NumberInput