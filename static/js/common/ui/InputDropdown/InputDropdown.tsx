import React, { useEffect, useRef, useState } from 'react'

import { Input } from '../index'

import styles from './InputDropdown.module.scss'

import { SDEKCityType } from 'api/userAPI/cartAPI'

interface Props<T> {
  value?: string
  onInput?: (e: string) => void
  options?: T[]
  selectedOption?: T | null
  name?: string
  inputSize?: 'small' | 'base' | 'large' | 'search'
  variant?: 'default' | 'grey'
  label?: string
  onSelect?: (value: T) => void
  hasError?: boolean
  errorText?: string
}

export const InputDropdown = <T extends SDEKCityType>(props: Props<T>) => {
  const {
    value,
    onInput,
    options,
    selectedOption,
    name,
    inputSize = 'base',
    label,
    variant = 'default',
    onSelect,
    hasError,
    errorText,
  } = props

  const ref = useRef<HTMLDivElement>(null)

  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

  const clickOutsideHandler = (e: MouseEvent) => {
    if (ref && !ref.current?.contains(e.target as Node)) {
      setIsOpenDropdown(false)
    }
  }

  const onSelectHandler = (option: T) => {
    onSelect && onSelect(option)
    setIsOpenDropdown(false)
  }

  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler)

    return () => {
      document.removeEventListener('click', clickOutsideHandler)
    }
  }, [])

  useEffect(() => {
    if (options?.length) {
      setIsOpenDropdown(true)
    } else {
      setIsOpenDropdown(false)
    }
  }, [options])

  return (
    <div className={styles['input-dropdown']} ref={ref}>
      <Input
        name={name}
        size={inputSize}
        variant={variant}
        label={label}
        value={value}
        onInput={onInput}
        hasError={hasError}
        errorText={errorText}
        onFocus={() => setIsOpenDropdown(true)}
      />
      <ul className={`${styles['dropdown-list']} ${isOpenDropdown ? styles['is-active'] : ''}`}>
        {options?.map((option, index) => (
          <li
            className={`${styles['dropdown-el']} ${
              selectedOption?.city_uuid === option.city_uuid && styles['is-selected']
            }`}
            key={index}
            onClick={() => onSelectHandler(option)}
          >
            {option.full_name}
          </li>
        ))}
      </ul>
    </div>
  )
}