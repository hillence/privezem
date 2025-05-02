import React, { useEffect, useState } from 'react'

import { useMask } from 'react-mask-field'

import styles from './Input.module.scss'

import { ReactComponent as ClearIcn } from 'assets/icons/close.svg'
import { ReactComponent as DeleteIcon } from 'assets/icons/svgIcons/deleteIcon.svg'
import { Spin } from 'common/ui'

type InputProps = {
  value?: number | string | null
  onInput?: (value: string) => void
  size?: 'small' | 'base' | 'large' | 'search'
  variant?: 'default' | 'grey'
  type?: string
  label?: string
  placeholder?: string
  errorText?: string
  hasError?: boolean
  hasLoad?: boolean
  hasClear?: boolean
  changeClearIcon?: boolean
  clearStyle?: 'default' | 'transparent' | 'white'
  onClear?: () => void
  mask?: string
  mod?: string
  className?: any
  inputStyles?: any
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  autoComplete?: string
  id?: string
  ref?: any
  setFormikFieldValue?: (field: string, touched?: boolean, shouldValidate?: boolean) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
  disabled?: boolean
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void
  readOnly?: boolean
}

const Input = (props: InputProps) => {
  const {
    name = '',
    className = '',
    type,
    label,
    placeholder,
    size,
    variant,
    value,
    errorText,
    onInput,
    hasError,
    hasLoad,
    hasClear,
    changeClearIcon,
    clearStyle = 'default',
    onClear,
    onChange,
    autoComplete,
    mask,
    id,
    ref,
    setFormikFieldValue,
    onKeyDown,
    inputStyles,
    onBlur,
    onFocus,
    disabled,
    onWheel,
    readOnly,
  } = props

  const [newVal, setNewVal] = useState<string | number>(value || '')
  const [inputFocus, setInputFocus] = useState<boolean>(false)

  const inputRef = useMask({ mask: mask, replacement: { _: /\d/ } })

  useEffect(() => {
    if (value && value !== newVal) setNewVal(value)
    if (value === '') setNewVal('')
  }, [value])

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    onInput ? onInput(value) : setNewVal(value)
  }

  const clearHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setNewVal('')
    if (onClear) onClear()
  }

  const blockClasses = `${styles['block--size-' + size] || ''} 
  ${styles['block--variant-' + variant] || ''} 
  ${hasError ? styles['block--has-error'] : ''} 
  ${hasLoad ? styles['block--has-load'] : ''}`

  const inputClasses = `${inputStyles}  ${styles.input} 
  ${newVal !== '' || inputFocus ? styles['input--active'] : ''} 
  ${styles['input--size-' + size] || ''} 
  ${styles['input--variant-' + variant] || ''} 
  ${hasError ? styles['input--has-error'] : ''} 
  ${hasLoad ? styles['input--has-load'] : ''}
  ${hasClear ? styles['input--has-clear'] : ''}`

  return (
    <div className={`${styles.block} ${className} ${blockClasses}`}>
      <div className={styles.wrapper}>
        {label && (
          <label
            className={`${styles.label} ${
              newVal !== '' || inputFocus ? styles['label--active'] : ''
            } 
            ${styles['label--size-' + size] || ''} 
            ${styles['label--variant-' + variant] || ''} 
            `}
          >
            {label}
          </label>
        )}

        <input
          className={inputClasses}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
          onInput={inputHandler}
          value={newVal}
          name={name}
          onChange={onChange}
          onFocus={e => {
            setInputFocus(true)
            setFormikFieldValue && setFormikFieldValue(name, true, true)
            onFocus && onFocus(e)
          }}
          onBlur={e => {
            setInputFocus(false)
            onBlur && onBlur(e)
          }}
          autoComplete={autoComplete}
          id={id}
          ref={mask ? inputRef : ref}
          onKeyDown={e => onKeyDown && onKeyDown(e)}
          onWheel={e => onWheel && onWheel(e)}
          readOnly={readOnly}
        />
        {hasLoad && <Spin className={styles.load} />}

        {hasClear && (
          <button
            className={`${styles.clear} ${newVal !== '' && styles['clear--visible']} 
            ${styles['clear--style-' + clearStyle] || ''} `}
            onClick={e => clearHandler(e)}
          >
            {changeClearIcon ? (
              <DeleteIcon className={styles.clearIcn} />
            ) : (
              <ClearIcn className={styles.clearIcn} />
            )}
          </button>
        )}
      </div>

      {/*{error && <span className={styles.error}>{error}</span>}*/}
      {hasError && errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  )
}

export default Input