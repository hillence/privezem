import { ChangeEvent, useEffect, useState } from 'react'

import styles from './Checkbox.module.scss'

type Props = {
  id: string
  value: boolean
  onChange?: (value: boolean) => void
  selected?: boolean
  disabled?: boolean
  errorText?: string
  hasError?: boolean
  name?: string
  onFormikChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = (props: Props) => {
  const { id, value, onChange, disabled, name, onFormikChange } = props

  const [newVal, setNewVal] = useState<boolean>(value || false)

  useEffect(() => {
    setNewVal(value ?? false)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setNewVal(e.target.checked)
    if (onChange) {
      onChange(e.target.checked)
    }
    if (onFormikChange) {
      onFormikChange(e)
    }
  }

  return (
    <div className={styles.block}>
      <input
        name={name}
        id={id}
        onChange={handleChange}
        type="checkbox"
        checked={newVal}
        disabled={disabled}
        className={styles.checkbox}
      />
      <label htmlFor={id} className={styles.label}></label>
    </div>
  )
}

export default Checkbox