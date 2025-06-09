import React from 'react'

import { useFormik } from 'formik'

import { getValidScheme } from '../../../common'

import styles from './PasswordModal.module.scss'

import { changeUserPasswordTC, ModalType } from 'app/store'
import { useAppDispatch } from 'common/hooks/customHooks'
import { Button, PasswordInput } from 'common/ui'

type PasswordModalPropsType = {
  modalType: ModalType
}

export const PasswordModal = ({ modalType }: PasswordModalPropsType) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: getValidScheme(modalType),
    onSubmit: values => {
      const newPassword = {
        password: values.oldPassword,
        newPassword: values.newPassword,
      }

      dispatch(changeUserPasswordTC(newPassword))
    },
  })

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  return (
    <form className={styles.modalBox}>
      <div className={styles.header}>изменить пароль</div>
      <div className={styles.content}>
        <form className={styles.form} autoComplete={'off'}>
          <PasswordInput
            name={'oldPassword'}
            label={'текущий пароль'}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            hasError={!!formik.errors.oldPassword && formik.touched.oldPassword}
            errorText={formik.errors.oldPassword}
            setFormikFieldValue={formik.setFieldTouched}
          />

          <PasswordInput
            name={'newPassword'}
            label={'новый пароль'}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            hasError={!!formik.errors.newPassword && formik.touched.newPassword}
            errorText={formik.errors.newPassword}
            setFormikFieldValue={formik.setFieldTouched}
          />

          <PasswordInput
            name={'confirmPassword'}
            label={'повторите новый пароль'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            hasError={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
            errorText={formik.errors.confirmPassword}
            setFormikFieldValue={formik.setFieldTouched}
          />
        </form>

        <div className={styles.submitBtn}>
          <Button mod="fluid" size="large" variant="default" type="submit" onClick={handleSubmit}>
            сохранить новый пароль
          </Button>
        </div>
      </div>
    </form>
  )
}
