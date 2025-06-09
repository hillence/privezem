import React, { useEffect, useRef, useState } from 'react'

import DeliveryAddress from '../../../types/delivery-address'

import styles from './DeliveryAddressDropdown.module.scss'

import { ReactComponent as ArrowDown } from 'assets/icons/arrow-down-small.svg'
import { ReactComponent as PlusIcon } from 'assets/icons/svgIcons/plusIcon.svg'

type Props = {
  addresses: DeliveryAddress[]
  onChange: (value: DeliveryAddress) => void
  addAddressHandler: () => void
}

export const DeliveryAddressDropdown = (props: Props) => {
  const { addresses, onChange, addAddressHandler } = props

  const [selectedOption, setSelectedOption] = useState<DeliveryAddress | null>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const defaultAddress = addresses.find(address => address.isDefaultAddress)

    if (defaultAddress) {
      setSelectedOption(defaultAddress)
      onChange(defaultAddress)
    } else if (addresses.length > 0) {
      setSelectedOption(addresses[addresses.length - 1])
      onChange(addresses[addresses.length - 1])
    }
  }, [addresses])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option: DeliveryAddress) => {
    setSelectedOption(option)
    setIsOpen(false)
    onChange(option)
  }

  const handleAddAddressHandler = () => {
    addAddressHandler()
    setIsOpen(false)
  }
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  }, [isOpen])

  return (
    <div className={styles.block} ref={dropdownRef}>
      <div className={styles.label} onClick={toggleDropdown}>
        <span className={styles.dropdownText}>
          {selectedOption
            ? `${selectedOption.address ?? ''} ${
                selectedOption.entrance ? `${', подъезд ' + selectedOption.entrance}, ` : ''
              } ${selectedOption.flat ? `${'кв. ' + selectedOption.flat}` : ''}`
            : 'Select an option'}
        </span>

        <ArrowDown className={`${styles.dropdownIcon} ${isOpen ? styles['is-active'] : ''}`} />
      </div>

      <div className={`${styles.dropdownMenu} ${isOpen ? styles['is-active'] : ''}`}>
        <ul className={styles.dropdownList}>
          <li
            key={'add'}
            className={`${styles.dropdownItem} ${styles.addAddress}`}
            onClick={handleAddAddressHandler}
          >
            Добавить новый адрес
            <PlusIcon className={styles.plusIcon} />
          </li>

          {addresses.map(option => (
            <li
              key={option.addressId}
              className={`${styles.dropdownItem} ${
                selectedOption?.addressId === option.addressId && styles['is-selected']
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.address ? `${option.address}` : ''}
              {option.entrance ? `${', подъезд ' + option.entrance} ,` : ''}
              {option.flat ? `${' кв. ' + option.flat}` : ''}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
