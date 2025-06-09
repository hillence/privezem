import React, { MouseEvent, useState } from 'react'

import { PassportModalDataType } from './Ordering'
import styles from './Ordering.module.scss'

import { ModalType, selectedGenders } from 'app/store'
import { ReactComponent as EditIcon } from 'assets/icons/svgIcons/editAdminUser.svg'
import { useAppSelector } from 'common'
import { CustomSelect, GenderRadio } from 'common/components'
import { Input, Switch } from 'common/ui'
import UserPassport from 'types/user-passport'

type Props = {
  formik: any
  modalTypes: PassportModalDataType
  openPassportModalHandler: (modalType: ModalType, item?: UserPassport) => void
  allPassports: UserPassport[]
  defaultPassport: UserPassport | null
  setUserPassport: (passport: UserPassport) => void
  isShowSwitch: boolean
}

export const OrderingPassport = (props: Props) => {
  const {
    formik,
    modalTypes,
    openPassportModalHandler,
    allPassports,
    setUserPassport,
    defaultPassport,
    isShowSwitch,
  } = props

  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
  const genders = useAppSelector(selectedGenders)

  const label =
    defaultPassport && defaultPassport.number ? defaultPassport.number : 'добавить новый паспорт'
  const editHandler = (e: MouseEvent<HTMLDivElement>, item: UserPassport) => {
    openPassportModalHandler(modalTypes.editModalType, item)
  }

  const setUserPassportHandler = (e: MouseEvent<HTMLDivElement>, passport: UserPassport) => {
    setUserPassport(passport)
    formik.setFieldTouched('userPassport.country', true, true)
    formik.setFieldTouched('userPassport.number', true, true)
    formik.setFieldTouched('userPassport.issueDate', true, true)
    formik.setFieldTouched('userPassport.unitCode', true, true)
    formik.setFieldTouched('userPassport.whoGave', true, true)
    formik.setFieldTouched('userPassport.birthdate', true, true)
  }

  return (
    <div className={`${styles.orderingBox} ${styles.passportBlock}`}>
      <div className={styles.formSubtitle}>паспортные данные</div>

      <div className={styles.passport}>
        <article className={styles.passportText}>
          Паспортные данные нужны для таможенного оформления и декларирования товаров при заказе
          из-за рубежа. Мы не передаём данные третьим лицам в соответствии с политикой
          конфиденциальности.
        </article>
        <CustomSelect
          label={label}
          types={modalTypes}
          openModalHandler={openPassportModalHandler}
          actionTitle={'добавить новый паспорт'}
          isSelectOpen={isSelectOpen}
          setIsSelectOpen={setIsSelectOpen}
        >
          {allPassports.map(item => {
            return (
              <div
                key={item.id}
                className={`${styles.item} ${isSelectOpen ? styles['is-active'] : ''}`}
              >
                <div className={styles.name} onClick={e => setUserPassportHandler(e, item)}>
                  {item.number}
                </div>
                <div onClick={e => editHandler(e, item)}>
                  <EditIcon className={styles.itemIcon} />
                </div>
              </div>
            )
          })}
        </CustomSelect>

        {defaultPassport ? (
          <div className={styles.orderingForm}>
            <div className={styles.form}>
              <Input
                name={'userPassport.country'}
                size={'base'}
                variant={'default'}
                label={'страна'}
                value={formik.values.userPassport?.country}
                onChange={formik.handleChange}
                hasError={
                  formik.touched.userPassport?.country && !!formik.errors.userPassport?.country
                }
                setFormikFieldValue={formik.setFieldTouched}
                errorText={formik.errors.userPassport?.country}
                disabled={true}
              />

              <div className={`${styles.inputBox} ${styles.passportBox}`}>
                <Input
                  name={'userPassport.number'}
                  size={'base'}
                  variant={'default'}
                  label={'серия и номер'}
                  value={formik.values.userPassport?.number}
                  mask={'____ ______'}
                  onChange={formik.handleChange}
                  hasError={
                    formik.touched.userPassport?.number && !!formik.errors?.userPassport?.number
                  }
                  setFormikFieldValue={formik.setFieldTouched}
                  errorText={formik.errors.userPassport?.number}
                />
                <Input
                  name={'userPassport.issueDate'}
                  size={'base'}
                  variant={'default'}
                  label={'когда выдан'}
                  value={formik.values.userPassport?.issueDate}
                  mask={'__.__.____'}
                  onChange={formik.handleChange}
                  hasError={
                    formik.touched.userPassport?.issueDate &&
                    !!formik.errors?.userPassport?.issueDate
                  }
                  setFormikFieldValue={formik.setFieldTouched}
                  errorText={formik.errors.userPassport?.issueDate}
                />
                <Input
                  name={'userPassport.unitCode'}
                  size={'base'}
                  variant={'default'}
                  label={'код подразделения'}
                  value={formik.values.userPassport?.unitCode}
                  mask={'___-___'}
                  onChange={formik.handleChange}
                  hasError={!!formik.errors?.userPassport?.unitCode}
                  errorText={formik.errors.userPassport?.unitCode}
                />
              </div>

              <Input
                name={'userPassport.whoGave'}
                size={'base'}
                variant={'default'}
                label={'кем выдан'}
                value={formik.values.userPassport?.whoGave}
                onChange={formik.handleChange}
                hasError={
                  formik.touched.userPassport?.whoGave && !!formik.errors?.userPassport?.whoGave
                }
                setFormikFieldValue={formik.setFieldTouched}
                errorText={formik.errors.userPassport?.whoGave}
              />
              <div className={styles.infoBox}>
                <div className={styles.birthDate}>
                  <Input
                    name={'userPassport.birthdate'}
                    size={'base'}
                    variant={'default'}
                    label={'дата рождения'}
                    value={formik.values.userPassport?.birthdate}
                    onChange={formik.handleChange}
                    mask={'__.__.____'}
                    onBlur={() => formik.setFieldTouched('userPassport.gender', true)}
                    hasError={
                      formik.touched.userPassport?.birthdate &&
                      !!formik.errors?.userPassport?.birthdate
                    }
                    setFormikFieldValue={formik.setFieldTouched}
                    errorText={formik.errors.userPassport?.birthdate}
                  />
                </div>
                <GenderRadio
                  genders={genders}
                  currentGender={formik.values.userPassport?.gender}
                  name={'ordering'}
                  hasError={
                    !!formik.errors.userPassport?.gender && formik.touched.userPassport?.gender
                  }
                  errorText={formik.errors.userPassport?.gender}
                  onChange={(value: string) => formik.setFieldValue('userPassport.gender', value)}
                />
              </div>
              {isShowSwitch ? (
                <div className={styles.switch}>
                  <Switch
                    name="userPassport.isSave"
                    value={formik.values.userPassport?.isSave}
                    onChange={(value: boolean) =>
                      formik.setFieldValue('userPassport.isSave', value)
                    }
                  />
                  <span>Сохранить паспорт для следующих покупок</span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
