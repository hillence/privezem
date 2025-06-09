import * as Yup from 'yup'

import {
  addressScheme,
  agreeWithPrivacyPolicyScheme,
  birthdateScheme,
  confirmPasswordScheme,
  countryScheme,
  emailScheme,
  genderScheme,
  passportIssueDateScheme,
  passportNumberScheme,
  passportUnitCodeScheme,
  passportWhoGaveScheme,
  passwordScheme,
  phoneScheme,
  priceMaxScheme,
  priceMinScheme,
  userNameScheme,
} from './field-schemes'

import { ModalType, UserAccountTabType } from 'app/store'

type GetValidSchemeType = UserAccountTabType | ModalType | 'ordering'

export const getValidScheme = (type: GetValidSchemeType) => {
  let scheme = Yup.object().shape({})

  switch (type) {
    case 'editUser': {
      scheme = scheme.shape({
        userName: userNameScheme(),
        email: emailScheme(),
        password: passwordScheme(),
        confirmPassword: confirmPasswordScheme('password'),
        priceMin: priceMinScheme(),
        priceMax: priceMaxScheme(),
      })

      return scheme
    }

    case 'addUser': {
      scheme = scheme.shape({
        userName: userNameScheme(),
        email: emailScheme(),
        password: passwordScheme().required('Это поле не может быть пустым'),
        confirmPassword: confirmPasswordScheme('password').required(
          'Это поле не может быть пустым'
        ),
        priceMin: priceMinScheme(),
        priceMax: priceMaxScheme(),
      })

      return scheme
    }

    case 'login': {
      scheme = scheme.shape({
        userEmail: emailScheme(),
        userPassword: passwordScheme().required('Это поле не может быть пустым'),
      })

      return scheme
    }

    case 'registration': {
      scheme = scheme.shape({
        userFullName: userNameScheme(),
        userEmail: emailScheme(),
        userPhone: phoneScheme(),
        userPassword: passwordScheme().required('Это поле не может быть пустым'),
        confirmPassword: confirmPasswordScheme('userPassword').required(
          'Это поле не может быть пустым'
        ),
        agreeWithPrivacyPolicy: agreeWithPrivacyPolicyScheme(),
      })

      return scheme
    }

    case 'passwordRecovery': {
      scheme = scheme.shape({
        userEmail: emailScheme(),
      })

      return scheme
    }

    case 'changePassword': {
      scheme = scheme.shape({
        oldPassword: passwordScheme().required('поле обязательное для заполнения'),
        newPassword: passwordScheme().required('поле обязательное для заполнения'),
        confirmPassword: confirmPasswordScheme('newPassword').required(
          'поле обязательное для заполнения'
        ),
      })

      return scheme
    }

    case 'settings': {
      scheme = scheme.shape({
        userName: userNameScheme(),
        userEmail: emailScheme(),
        userPhone: phoneScheme(),
        birthdate: birthdateScheme(),
      })

      return scheme
    }

    case 'addPassport':
    case 'editPassport': {
      scheme = scheme.shape({
        country: countryScheme(),
        number: passportNumberScheme(),
        issueDate: passportIssueDateScheme(),
        unitCode: passportUnitCodeScheme(),
        whoGave: passportWhoGaveScheme(),
        birthdate: birthdateScheme(),
        gender: genderScheme(),
      })

      return scheme
    }

    case 'ordering': {
      scheme = scheme.shape({
        // address: addressScheme(),
        userData: Yup.object().shape({
          userName: userNameScheme(),
          userEmail: emailScheme(),
          userPhone: phoneScheme(),
        }),
        userPassport: Yup.object().shape({
          country: countryScheme(),
          number: passportNumberScheme(),
          issueDate: passportIssueDateScheme(),
          unitCode: passportUnitCodeScheme(),
          whoGave: passportWhoGaveScheme(),
          birthdate: birthdateScheme(),
          gender: genderScheme(),
        }),
      })

      return scheme
    }

    case 'editOrderData': {
      scheme = scheme.shape({
        deliveryAddress: addressScheme(),
        userName: userNameScheme(),
        userEmail: emailScheme(),
        userPhone: phoneScheme(),
        userPassportData: Yup.object().shape({
          country: countryScheme(),
          passportNumber: passportNumberScheme(),
          receiveDate: passportIssueDateScheme(),
          unitCode: passportUnitCodeScheme(),
          whoGaveOut: passportWhoGaveScheme(),
          birthdate: birthdateScheme(),
          gender: genderScheme(),
        }),
      })

      return scheme
    }

    default: {
      return scheme
    }
  }
}
