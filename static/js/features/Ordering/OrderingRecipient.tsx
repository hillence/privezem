import React, { useEffect, useState } from 'react'

import styles from './Ordering.module.scss'

import { Input, Radio, Switch } from 'common/ui'

type Props = {
  formik: any
}

export const OrderingRecipient = (props: Props) => {
  const { formik } = props

  const communicationTypes = ['Telegram', 'Whatsapp', 'почта']
  const [communicationType, setCommunicationType] = useState<string>(
    formik.values.userData.communicationType
  )

  const [isMobile, setIsMobile] = useState(false)

  const changeMethodHandler = (value: string) => {
    setCommunicationType(value)
    formik.setFieldValue('userData.communicationType', value)
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
      <div className={styles.formSubtitle}>контактное лицо для получения</div>

      <div className={styles.orderingForm}>
        <div className={styles.form}>
          <Input
            name={'userData.userName'}
            size={'base'}
            variant={'default'}
            label={'имя и фамилия'}
            value={formik.values.userData.userName}
            onChange={formik.handleChange}
            hasError={!!formik.errors?.userData?.userName}
            errorText={formik.errors?.userData?.userName}
          />
          <Input
            name={'userData.userEmail'}
            size={'base'}
            variant={'default'}
            label={'почта'}
            value={formik.values.userData.userEmail}
            onChange={formik.handleChange}
            hasError={!!formik.errors?.userData?.userEmail}
            errorText={formik.errors?.userData?.userEmail}
          />
          <Input
            name={'userData.userPhone'}
            size={'base'}
            variant={'default'}
            label={'телефон'}
            value={formik.values.userData.userPhone}
            onChange={formik.handleChange}
            hasError={formik.touched.userData?.userPhone && !!formik.errors?.userData?.userPhone}
            errorText={formik.errors?.userData?.userPhone}
            setFormikFieldValue={formik.setFieldTouched}
            mask={'+_ (___) ___-__-__'}
          />

          <div className={styles.formSwitch}>
            <Switch
              name="userData.isCallNeeded"
              value={formik.values.userData.isCallNeeded}
              onFormikChange={formik.handleChange}
            />
            <span>
              {!isMobile ? 'Позвонить мне для подтверждения' : 'Позвонить для подтверждения'}
            </span>
          </div>
        </div>

        <div className={styles.messaging}>
          <div className={styles.messagingSubtitle}>удобный способ связи</div>

          <div className={styles.radioBox}>
            {communicationTypes.map(item => (
              <Radio
                id={item}
                key={item}
                value={item}
                label={item}
                onChange={(method: string) => changeMethodHandler(method)}
                selected={communicationType === item}
              />
            ))}
          </div>

          <Input
            name={'userData.communicationLink'}
            size={'base'}
            variant={'default'}
            label={'ссылка на мессенджер или почта'}
            value={formik.values.userData.communicationLink}
            onChange={formik.handleChange}
            hasError={!!formik.errors?.userData?.communicationLink}
            errorText={formik.errors?.userData?.communicationLink}
          />
        </div>
      </div>
    </div>
  )
}
