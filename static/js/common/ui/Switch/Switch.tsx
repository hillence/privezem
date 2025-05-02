import React, { ChangeEvent, useEffect, useState } from 'react'

import styles from './Switch.module.scss'

type Props = {
  value?: boolean
  onChange?: (e: boolean) => void
  onFormikChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  name?: string
}

const Switch = (props: Props) => {
  const { name, value, onChange, onFormikChange, disabled } = props

  const [checked, setChecked] = useState(value ? value : false)

  useEffect(() => {
    setChecked(value ?? false)
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    if (onChange) onChange(e.target.checked)
    if (onFormikChange) onFormikChange(e)
  }

  return (
    <>
      <input
        type="checkbox"
        id={name}
        disabled={disabled}
        className={styles.switch}
        onChange={handleChange}
        checked={checked}
        name={name}
      />
      <label htmlFor={name} className={styles.switchLabel}></label>
    </>
  )
}

export default Switch