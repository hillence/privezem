import React from 'react'

import styles from './RadioButton.module.scss'

export const RadioButton = (props: RadioButtonPropsType) => {
  const { currentValue, onChange } = props

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="Telegram">
        Telegram
        <input
          type="radio"
          name="Telegram"
          value={'Telegram'}
          className={styles.input}
          id="Telegram"
          checked={currentValue === 'Telegram'}
          onChange={handleChange}
        />
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.label} htmlFor="Whatsapp">
        whatsapp
        <input
          type="radio"
          name="Whatsapp"
          value={'Whatsapp'}
          className={styles.input}
          id="Whatsapp"
          checked={currentValue === 'Whatsapp'}
          onChange={handleChange}
        />
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.label} htmlFor="Email">
        почта
        <input
          type="radio"
          name="Email"
          value={'Email'}
          className={styles.input}
          id="Email"
          checked={currentValue === 'Email'}
          onChange={handleChange}
        />
        <span className={styles.checkmark}></span>
      </label>
    </div>
  )
}

//types =====================================================

type RadioButtonPropsType = {
  currentValue: string
  onChange: (e: string) => void
}