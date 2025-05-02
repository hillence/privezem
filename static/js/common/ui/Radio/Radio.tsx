import { useEffect, useState } from 'react'

import styles from './Radio.module.scss'

type Props = {
  id: string
  value: string | undefined
  label?: string
  onChange: (value: string) => void
  selected?: boolean
  disabled?: boolean
  errorText?: string
  hasError?: boolean
  labelStyles?: string
}

const Radio = (props: Props) => {
  const { id, value, label, onChange, selected, disabled, labelStyles } = props

  const [newVal, setNewVal] = useState(value || '')

  useEffect(() => {
    setNewVal(value ?? '')
  }, [value])

  const handleChange = (value: string) => {
    setNewVal(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className={styles.block}>
      <input
        id={id}
        onChange={e => handleChange(e.target.value)}
        value={newVal}
        type="radio"
        checked={selected}
        disabled={disabled}
        className={styles.radio}
      />
      <label htmlFor={id} className={`${labelStyles} ${styles.label}`}>
        <span>{label}</span>
      </label>
    </div>
  )
}

export default Radio