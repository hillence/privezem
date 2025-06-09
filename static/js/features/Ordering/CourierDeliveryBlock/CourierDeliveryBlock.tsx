import React, { useState } from 'react'

import { DaDataAddress, DaDataSuggestion } from 'react-dadata'
import * as uuid from 'uuid'

import { ModalType, setRootModalDataAC } from '../../../app/store'
import { useAppDispatch } from '../../../common'
import { Input, Switch } from '../../../common/ui'
import DeliveryAddress from '../../../types/delivery-address'
import { DadataInput } from '../DaDataInput/DaDataInput'
import { DeliveryAddressDropdown } from '../DeliveryAddressDropdown/DeliveryAddressDropdown'
import styles from '../Ordering.module.scss'

type Props = {
  addresses: DeliveryAddress[]
  formik: any
  isMobile: boolean
}

export const CourierDeliveryBlock = (props: Props) => {
  const { formik, addresses, isMobile } = props

  const dispatch = useAppDispatch()

  const [currentAddress, setCurrentAddress] = useState<DeliveryAddress | undefined>()

  const onChangeDaData = (daData: DaDataSuggestion<DaDataAddress> | undefined) => {
    if (daData?.value) {
      formik.setFieldValue('address.address', daData.value)
    }
  }

  const handelInputChange = (value: string, field: keyof DeliveryAddress) => {
    // @ts-ignore
    const updatedData: DeliveryAddress = {
      ...currentAddress,
      [field]: value,
      addressId: currentAddress?.addressId ?? uuid.v4(),
    }

    setCurrentAddress(updatedData)
    // console.log(updatedData)
    formik.setFieldValue('address.address', value)
  }

  const setCurrentAddressHandler = (value: DeliveryAddress) => {
    formik.setFieldValue('address.address', value.address)
    formik.setFieldValue('address.entrance', value.entrance ?? '')
    formik.setFieldValue('address.floor', value.floor ?? '')
    formik.setFieldValue('address.flat', value.flat ?? '')
    formik.setFieldValue('address.intercom', value.intercom ?? '')
    formik.setFieldValue('address.note', value.note ?? '')
  }

  const addAddressHandler = () => {
    openModalHandler('addAddress')
  }
  const openModalHandler = (type: ModalType) => {
    dispatch(setRootModalDataAC({ isOpen: true, modalType: type, direction: 'right' }))
  }

  return (
    <>
      {addresses.length !== 0 ? (
        <>
          <DeliveryAddressDropdown
            addresses={addresses}
            onChange={(value: DeliveryAddress) => setCurrentAddressHandler(value)}
            addAddressHandler={addAddressHandler}
          />

          <Input
            name={'address.address'}
            size={'base'}
            variant={'default'}
            label={'город, улица и дом'}
            value={formik.values.address.address}
            onChange={formik.handleChange}
            hasError={formik.touched.address?.address && !!formik.errors?.address}
            errorText={formik.errors.address}
          />
        </>
      ) : (
        <DadataInput
          currentAddress={currentAddress}
          handelInputChange={(value: string) => handelInputChange(value, 'address')}
          onChangeDaData={(value: DaDataSuggestion<DaDataAddress> | undefined) =>
            onChangeDaData(value)
          }
          hasError={formik.touched.address?.address && !!formik.errors?.address}
          errorText={formik.errors?.address?.address}
        />
      )}
      <div className={styles.inputBox}>
        <Input
          name={'address.entrance'}
          size={'base'}
          variant={'default'}
          label={'подъезд'}
          mask={'___'}
          value={formik.values.address.entrance}
          onChange={formik.handleChange}
        />
        <Input
          name={'address.floor'}
          size={'base'}
          variant={'default'}
          label={'этаж'}
          value={formik.values.address.floor}
          onChange={formik.handleChange}
          mask={'___'}
        />

        <Input
          name={'address.flat'}
          size={'base'}
          variant={'default'}
          label={'квартира'}
          value={formik.values.address.flat}
          onChange={formik.handleChange}
          mask={'____'}
        />

        <Input
          name={'address.intercom'}
          size={'base'}
          variant={'default'}
          label={'домофон'}
          value={formik.values.address.intercom}
          onChange={formik.handleChange}
          mask={'______'}
        />
      </div>

      <Input
        name={'address.note'}
        size={'base'}
        variant={'default'}
        label={'комментарий курьеру'}
        value={formik.values.address.note}
        onChange={formik.handleChange}
      />

      {addresses.length === 0 && (
        <div className={styles.formSwitch}>
          <Switch
            name={'address.isSaveAddress'}
            value={formik.values.address.isSaveAddress}
            onFormikChange={formik.handleChange}
          />
          <span>{!isMobile ? 'Сохранить адрес для следующих покупок' : 'Сохранить адрес'}</span>
        </div>
      )}
    </>
  )
}
