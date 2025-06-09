import React, { useEffect, useState } from 'react'

import { SdekMap } from '../SDEKMap/SDEKMap'

import styles from './IssuePoinDelivery.module.scss'

import { cartAPI, SDEKCityType, SDEKPoint, SDEKPointType } from 'api/userAPI/cartAPI'
import { ReactComponent as PointIcon } from 'assets/icons/svgIcons/map-point.svg'
import { useDebounce } from 'common/hooks/useDebounce'
import { Button, Input, InputDropdown } from 'common/ui'

type Props = {
  formik: any
  isMobile: boolean
}

export const IssuePointDelivery = (props: Props) => {
  const { formik, isMobile } = props

  const [inputCity, setInputCity] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<SDEKCityType | null>(null)
  const [citiesSuggestions, setCitiesSuggestions] = useState<SDEKCityType[]>([])
  const [cityPoints, setCityPoints] = useState<SDEKPointType | null>(null)
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false)

  const debouncedCity = useDebounce(inputCity, 250)

  const onSelectCity = (value: SDEKCityType) => {
    setSelectedCity(value)
    setInputCity(value.full_name)
  }

  const onInputChange = (value: string) => {
    setInputCity(value)
    if (value.length === 0) {
      setSelectedCity(null)
      setCitiesSuggestions([])
      setCityPoints(null)
    }
  }

  const openMapHandler = () => {
    setIsOpenMap(true)
  }
  const closeMapHandler = () => {
    setIsOpenMap(false)
  }

  const onSelectPVZ = (point: SDEKPoint | null) => {
    if (!point) {
      formik.setFieldValue('deliveryPointAddress', '')

      return
    }
    formik.setFieldValue('deliveryPointAddress', `${point.full_address} ${point.code}`)
    setIsOpenMap(false)
  }

  const getCitySuggestions = async (city: string) => {
    try {
      const res = await cartAPI.getSDEKCitiesSuggestions(city)

      if (res.data.statusCode === 0) {
        setCitiesSuggestions(res.data.cities)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const getCityPoints = async (cityCode: number) => {
    try {
      const res = await cartAPI.getCityPoints(cityCode)

      if (res.data.statusCode === 0) {
        setCityPoints(res.data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    if (debouncedCity) {
      void getCitySuggestions(debouncedCity)
    }
  }, [debouncedCity])

  useEffect(() => {
    if (selectedCity) {
      void getCityPoints(selectedCity.code)
    }
  }, [selectedCity])

  return (
    <div className={styles[`input-box`]}>
      <div className={styles['city-input']}>
        <InputDropdown<SDEKCityType>
          value={inputCity}
          label={'Введите город'}
          onInput={onInputChange}
          options={citiesSuggestions}
          selectedOption={selectedCity}
          onSelect={onSelectCity}
        />
        {selectedCity && (
          <Button
            size={isMobile ? 'small' : 'large'}
            variant={isMobile ? 'transparent' : 'white'}
            className={styles['map-btn']}
            onClick={openMapHandler}
          >
            <PointIcon />
            выбрать на карте
          </Button>
        )}
      </div>

      {formik.values.deliveryPointAddress && (
        <div className={styles['address-input']}>
          <Input
            name={'deliveryPointAddress'}
            size={'base'}
            variant={'default'}
            label={'адрес'}
            value={formik.values.deliveryPointAddress}
            onChange={formik.handleChange}
            hasError={formik.touched.deliveryPointAddress && !!formik.errors?.deliveryPointAddress}
            errorText={formik.deliveryPointAddress}
          />
        </div>
      )}

      {isOpenMap && (
        <SdekMap
          isOpenMap={isOpenMap}
          cityPoints={cityPoints?.points}
          cityCoordinates={cityPoints?.cityCoordinates}
          closeMapHandler={closeMapHandler}
          onSelectPVZ={onSelectPVZ}
          isMobile={isMobile}
        />
      )}
    </div>
  )
}
