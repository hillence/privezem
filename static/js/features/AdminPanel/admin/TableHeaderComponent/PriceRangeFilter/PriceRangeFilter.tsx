import React, { useEffect, useState } from 'react'

import styles from './PriceRangeFilter.module.scss'

import { RangeType } from 'app/store'
import { useDebounce } from 'common/hooks/useDebounce'
import { Input } from 'common/ui'

type PriceRangeFilterPropsType = {
  filteredPrices: RangeType | null
  filterPriceHandler: (prices: RangeType) => void
}
export const PriceRangeFilter = (props: PriceRangeFilterPropsType) => {
  const { filteredPrices, filterPriceHandler } = props
  const [minValue, setMinValue] = useState<string>('')
  const [maxValue, setMaxValue] = useState<string>('')

  const debouncedMinPrice = useDebounce(minValue.replace(/\D/g, ''), 700)
  const debouncedMaxPrice = useDebounce(maxValue.replace(/\D/g, ''), 700)

  const valueHandler = (value: string, rate: string) => {
    value = value.replace(/\D/g, '') // Удаляем все нецифровые символы

    if (!/^\d*$/.test(value)) {
      return
    } else {
      // Добавляем пробелы через каждые три символа
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') // Добавляем пробелы через каждые три символа

      if (rate === 'min') {
        setMinValue(value)
      } else if (rate === 'max') {
        setMaxValue(value)
      }
    }
  }

  const priceRange: RangeType = {}

  useEffect(() => {
    if (debouncedMinPrice !== '') {
      priceRange.from = debouncedMinPrice
    }
    if (debouncedMaxPrice !== '') {
      priceRange.to = debouncedMaxPrice
    }
    filterPriceHandler(priceRange)
  }, [debouncedMinPrice, debouncedMaxPrice])

  useEffect(() => {
    filteredPrices?.from ? valueHandler(filteredPrices.from, 'min') : valueHandler('', 'min')
    filteredPrices?.to ? valueHandler(filteredPrices.to, 'max') : valueHandler('', 'max')
  }, [filteredPrices])

  return (
    <div className={styles.priceFilter}>
      <div className={styles.item}>
        <span className={styles.text}>от</span>
        <Input
          value={minValue}
          placeholder={'min ₽'}
          variant={'default'}
          size={'small'}
          type={'text'}
          onInput={(value: string) => valueHandler(value, 'min')}
        />
      </div>
      <div className={styles.item}>
        <span className={styles.text}>до</span>
        <Input
          value={maxValue}
          placeholder={'max ₽'}
          variant={'default'}
          size={'small'}
          type={'text'}
          onInput={(value: string) => valueHandler(value, 'max')}
        />
      </div>
    </div>
  )
}
