import React, { useEffect, useState } from 'react'

import { CourierDeliveryBlock } from './CourierDeliveryBlock/CourierDeliveryBlock'
import { IssuePointDelivery } from './IssuePointDelivery/IssuePointDelivery'
import styles from './Ordering.module.scss'

import ToggleTab from 'common/ui/TabButton/ToggleTab'
import DeliveryAddress from 'types/delivery-address'

import 'react-dadata/dist/react-dadata.css'

enum deliveryMethods {
  COURIER = 'courier',
  POINT = 'issuePoint',
}

type Props = {
  addresses: DeliveryAddress[]
  formik: any
  deliveryPointAddress: string
}

export const OrderingAddress = (props: Props) => {
  const { addresses, formik, deliveryPointAddress } = props

  const [deliveryMethod, setDeliveryMethod] = useState<string>(deliveryMethods.COURIER)

  const [isMobile, setIsMobile] = useState(false)

  const tabClickHandle = (value: boolean) => {
    const newValue = value ? deliveryMethods.COURIER : deliveryMethods.POINT

    formik.setFieldValue('deliveryMethod', newValue)
    setDeliveryMethod(newValue)
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className={styles.orderingBox}>
      <div className={styles.formSubtitle}>доставка</div>

      <div className={styles.ordering}>
        <div className={styles.deliveryTabs}>
          <ToggleTab
            value={deliveryMethod !== deliveryMethods.POINT}
            onChange={tabClickHandle}
            label="в пункт выдачи"
            dataLabel={isMobile ? 'курьером' : 'курьером до двери'}
          />
          <div className={styles.orderingForm}>
            <div className={styles.form}>
              {deliveryMethods.COURIER === deliveryMethod && (
                <CourierDeliveryBlock addresses={addresses} formik={formik} isMobile={isMobile} />
              )}

              {deliveryMethods.POINT === deliveryMethod && (
                <IssuePointDelivery formik={formik} isMobile={isMobile} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
