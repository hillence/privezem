import React, { useEffect, useState } from 'react'

import styles from './Input.module.scss'

import { ReactComponent as HidePasswordIcon } from 'assets/icons/svgIcons/hidePasswordIcon.svg'
import { ReactComponent as ShowPasswordIcn } from 'assets/icons/svgIcons/showPasswordIcon.svg'

type InputProps = {
  value?: string | null
  label?: string
  onInput?: (value: string) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  errorText?: string
  hasError?: boolean
  autoComplete?: string
  name?: string
  id?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  readOnly?: boolean
  setFormikFieldValue?: (field: string, touched?: boolean, shouldValidate?: boolean) => void
}

const PasswordInput = (props: InputProps) => {
  const {
    name = '',
    value,
    label,
    errorText,
    onInput,
    hasError,
    onChange,
    onFocus,
    onBlur,
    id,
    autoComplete,
    onKeyDown,
    readOnly,
    setFormikFieldValue,
  } = props

  const [newVal, setNewVal] = useState(value || ('' as string))
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  useEffect(() => {
    if (value && value !== newVal) setNewVal(value)
  }, [value])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    setNewVal(value)

    setError(null)

    onInput && onInput(value)
  }

  const showPasswordHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowPassword(prevState => !prevState)
  }

  const passwordIcon = !showPassword ? (
    <HidePasswordIcon className={styles.clearIcn} />
  ) : (
    <ShowPasswordIcn className={styles.clearIcn} />
  )

  // console.log('hasError', hasError, errorText)

  const inputClasses = `${styles.input}
   ${styles['input--password']}
   ${newVal !== '' || inputFocus ? styles['input--active'] : ''} 
          ${styles['input--size-base']}
          ${styles['input--variant-default']}
          ${hasError || error ? styles['input--has-error'] : ''}`

  return (
    <div className={`${styles.block} ${hasError || error ? styles['block--has-error'] : ''}`}>
      <div className={styles.wrapper}>
        {label && (
          <label
            className={`${styles.label} 
            ${newVal !== '' || inputFocus ? styles['label--active'] : ''} 
            ${styles['label--size-base']} ${styles['label--variant-default']}`}
          >
            {label}
          </label>
        )}

        <input
          className={inputClasses}
          type={!showPassword ? 'password' : 'text'}
          onInput={inputHandler}
          onChange={onChange}
          onFocus={e => {
            setInputFocus(true)
            onFocus && onFocus(e)
            setFormikFieldValue && setFormikFieldValue(name, true, true)
          }}
          onBlur={() => setInputFocus(false)}
          value={newVal}
          autoComplete={autoComplete}
          name={name}
          readOnly={readOnly ?? false}
          id={id}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
        />

        <button
          className={styles.password}
          onClick={e => showPasswordHandler(e)}
          role={'button'}
          type={'button'}
          // id={id}
        >
          {passwordIcon}
        </button>
      </div>

      {error && <span className={styles.error}>{error}</span>}
      {hasError && errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  )
}

export default PasswordInput