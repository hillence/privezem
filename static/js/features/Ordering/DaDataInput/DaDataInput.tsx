import React, { useState } from 'react'

import { AddressSuggestions, DaDataAddress, DaDataSuggestion } from 'react-dadata'
import { DaDataAddressBounds } from 'react-dadata/dist/types'

import styles from './DaDataInput.module.scss'

import { dadataKey } from 'app/keys/dadata-key'
import DeliveryAddress from 'types/delivery-address'

type Props = {
  currentAddress?: DeliveryAddress
  handelInputChange: (value: string) => void
  onChangeDaData: (value: DaDataSuggestion<DaDataAddress> | undefined) => void
  hasError?: boolean
  errorText?: string
  dadataSuggestionsClassName?: string
  label?: string
  city?: string
  filterToBound?: DaDataAddressBounds
  filterRestrictValue?: boolean
  filterFromBound?: DaDataAddressBounds
  autoload?: boolean
}

export const DadataInput = (props: Props) => {
  const {
    currentAddress,
    handelInputChange,
    onChangeDaData,
    hasError,
    errorText,
    dadataSuggestionsClassName,
    label = 'город, улица и дом',
    city,
    filterToBound,
    filterRestrictValue,
    filterFromBound,
    autoload,
  } = props

  const [inputFocus, setInputFocus] = useState<boolean>(false)

  // console.log('city', city)

  const labelClassNames = `${styles.label} ${styles['label--size-base']} ${
    styles['label--variant-default']
  } ${
    (currentAddress?.address && currentAddress?.address !== '') || city?.length || inputFocus
      ? styles['label--active']
      : ''
  } `

  return (
    <div className={`${styles.block} ${hasError ? styles['block--has-error'] : ''}`}>
      <div className={`${styles.dadataWrapper}`}>
        <label className={labelClassNames}>{label}</label>

        <AddressSuggestions
          defaultQuery={city ?? ''}
          filterRestrictValue={filterRestrictValue}
          filterToBound={filterToBound}
          filterFromBound={filterFromBound}
          token={dadataKey}
          onChange={(value: DaDataSuggestion<DaDataAddress> | undefined) => onChangeDaData(value)}
          inputProps={{
            onFocus: () => setInputFocus(true),
            onBlur: () => setInputFocus(false),
            onInput: (e: React.ChangeEvent<HTMLInputElement>) => handelInputChange(e.target.value),
            className: `${hasError ? styles['input--has-error'] : ''}`,
          }}
          containerClassName={`${styles.dadataContainer} ${
            hasError ? styles['input--active'] : ''
          } `}
          suggestionsClassName={`${dadataSuggestionsClassName ?? ''} ${styles.dadataSuggestions}`}
          suggestionClassName={styles.dadataSuggestion}
          currentSuggestionClassName={styles.dadataCurrentSuggestion}
          highlightClassName={styles.dadataHighlight}
          hintClassName={styles.dadataHint}
          autoload={autoload}
        />
      </div>
      {hasError && errorText && <span className={styles.error}>{errorText}</span>}
    </div>
  )
}
