 validationDate } from './current-date-validation'

export const passwordScheme = () =>
  Yup.string()
    .matches(/^[a-zA-Z0-9~!@#$%^&*_\-+=|\\(){}[\]:;<>,.?/]+$/, {
      message: 'В пароле использованы недопустимые символы',
    })
    .min(6, 'пароль должен содержать минимум 6 символов')

export const confirmPasswordScheme = (name: string) =>
  Yup.string().oneOf([Yup.ref(name)], 'пароли не совпадают')

export const userNameScheme = () =>
  Yup.string()
    .matches(
      /^[A-Za-zА-Яа-я\s-]+$/,
      'введите настоящее имя, это нужно, чтобы правильно оформить заказ'
    )
    .min(2, 'Имя должно содержать минимум 2 символа')
    .required('Это поле не может быть пустым')

export const emailScheme = () =>
  Yup.string()
    .email('Некорректный адрес электронной почты')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Некорректный адрес электронной почты')
    .required('Введите адрес электронной почты')

export const priceMinScheme = () =>
  Yup.number()
    .max(Yup.ref('priceMax'), 'минимальная цена не может быть больше максимальной')
    .nullable()

export const priceMaxScheme = () =>
  Yup.number()
    .min(Yup.ref('priceMin'), 'максимальная цена не может быть меньше минимальной')
    .nullable()

export const phoneScheme = () =>
  Yup.string()
    .length(18, 'номер телефона должен содержать 11 цифр')
    .required('Некорректный номер телефона')

export const agreeWithPrivacyPolicyScheme = () =>
  Yup.boolean().oneOf([true], 'Подтвердите согласие')

export const productQuantityScheme = (name: string, max: number) =>
  Yup.object({
    [name]: Yup.number()
      .required('Обязательное поле')
      .min(1, 'Минимальное количество товара 1')
      .max(max, 'Нельзя увеличить количество товара'),
  })

export const birthdateScheme = () =>
  Yup.string().test(
    'isValidDate',
    'Введите корректную дату в формате ДД.ММ.ГГГГ',
    function (value) {
      return validationDate(value)
    }
  )

export const countryScheme = () =>
  Yup.string()
    .min(2, 'Должно быть 2 символа')
    .matches(/^[A-Za-zА-Яа-я\s-]+$/, 'Разрешены только буквы')
    .required('Это поле не может быть пустым')

export const passportNumberScheme = () =>
  Yup.string()
    .matches(/^[A-Za-z0-9\s-]+$/, 'Разрешены только буквы и цифры')
    .required('Это поле не может быть пустым')

export const passportIssueDateScheme = () =>
  Yup.string().test(
    'isValidDate',
    'Введите корректную дату в формате ДД.ММ.ГГГГ',
    function (value) {
      return validationDate(value)
    }
  )

export const passportUnitCodeScheme = () => Yup.string().nullable()

export const passportWhoGaveScheme = () =>
  Yup.string()
    .matches(/^[A-Za-zА-Яа-я0-9№\s-]+$/, 'Разрешены только буквы, цифры и знак №')
    .required('Это поле не может быть пустым')

export const addressScheme = () =>
  Yup.object().shape({
    address: Yup.string().required('Это поле не может быть пустым'),
  })

export const genderScheme = () => Yup.string().required('Выберите пол')
