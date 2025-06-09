import React from 'react'

import { useFormik } from 'formik'

import UserAccount from '../UserAccount'

import { PasswordModal } from './PasswordModal'
import styles from './Settings.module.scss'

import {
  selectedIsVerifiedEmail,
  selectedRootModalData,
  selectedUserData,
  setRootModalDataAC,
  updateUserDataTC,
} from 'app/store'
import { getValidScheme } from 'common'
import { ConfirmEmail, RightModal } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { Button, Input } from 'common/ui'

const Settings = () => {
  const dispatch = useAppDispatch()

  const userDataStore = useAppSelector(selectedUserData)
  const rootModalData = useAppSelector(selectedRootModalData)
  const isVerified = useAppSelector(selectedIsVerifiedEmail)

  const formik = useFormik({
    initialValues: {
      userName: userDataStore.userName ? userDataStore.userName : '',
      userEmail: userDataStore.userEmail ? userDataStore.userEmail : '',
      userPhone: userDataStore.userPhone ? userDataStore.userPhone : '',
      birthdate: userDataStore.birthdate ? userDataStore.birthdate : '',
    },
    validationSchema: getValidScheme('settings'),
    onSubmit: values => {
      dispatch(updateUserDataTC(values))
    },
  })

  const openModalHandler = () => {
    dispatch(setRootModalDataAC({ isOpen: true, modalType: 'changePassword', direction: 'right' }))
  }

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  const disableSubmit = () => {
    return (
      (userDataStore.userName === formik.values.userName &&
        userDataStore.userEmail === formik.values.userEmail &&
        userDataStore.userPhone === formik.values.userPhone &&
        userDataStore.birthdate === formik.values.birthdate) ||
      !!formik.errors.userName ||
      !!formik.errors.userEmail ||
      !!formik.errors.userPhone ||
      !!formik.errors.birthdate
    )
  }

  return (
    <UserAccount>
      <div className={styles.container}>
        <h3 className={styles.pageTitle}>настройки</h3>

        <div className={styles.contentBox}>
          <form className={styles.form} autoComplete={'off'}>
            <Input
              name={'userName'}
              size={'base'}
              variant={'default'}
              label={'имя и фамилия'}
              value={formik.values.userName}
              hasError={!!formik.errors.userName}
              errorText={formik.errors.userName}
              onChange={formik.handleChange}
            />
            <Input
              name={'userEmail'}
              size={'base'}
              variant={'default'}
              label={'почта'}
              value={formik.values.userEmail}
              hasError={!!formik.errors.userEmail}
              errorText={formik.errors.userEmail}
              onChange={formik.handleChange}
              disabled={userDataStore.emailVerified ?? false}
            />
            <Input
              name={'userPhone'}
              size={'base'}
              variant={'default'}
              label={'телефон'}
              value={formik.values.userPhone}
              onChange={formik.handleChange}
              hasError={formik.touched.userPhone && !!formik.errors.userPhone}
              errorText={formik.errors.userPhone}
              setFormikFieldValue={formik.setFieldTouched}
              mask={'+_ (___) ___-__-__'}
            />

            <Input
              name={'birthdate'}
              size={'base'}
              variant={'default'}
              label={'дата рождения'}
              value={formik.values.birthdate}
              errorText={formik.errors.birthdate}
              hasError={formik.touched.birthdate && !!formik.errors?.birthdate}
              onChange={formik.handleChange}
              setFormikFieldValue={formik.setFieldTouched}
              mask={'__.__.____'}
            />
          </form>

          <div className={styles.actions}>
            <Button
              size={'large'}
              variant={'default'}
              type="submit"
              className={styles.saveBtn}
              onClick={handleSubmit}
              disabled={disableSubmit()}
            >
              сохранить изменения
            </Button>

            <Button size={'large'} variant={'transparent'} type="button" onClick={openModalHandler}>
              изменить пароль
            </Button>
          </div>

          {!isVerified && <ConfirmEmail dispatch={dispatch} />}
        </div>
      </div>
      <RightModal modalData={rootModalData} modalType={rootModalData.modalType}>
        {rootModalData.modalType === 'changePassword' && (
          <PasswordModal modalType={rootModalData.modalType} />
        )}
      </RightModal>
    </UserAccount>
  )
}

export default Settings
