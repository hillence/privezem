export function generatePassword(length: number) {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '~!@#$%^&*_-+=|\\(){}[]:;<>,.?/'

  let password = ''

  // Добавляем как минимум одну большую букву
  password += uppercaseLetters.charAt(Math.floor(Math.random() * uppercaseLetters.length))

  // Добавляем как минимум одну маленькую букву
  password += lowercaseLetters.charAt(Math.floor(Math.random() * lowercaseLetters.length))

  // Добавляем как минимум одну цифру
  password += numbers.charAt(Math.floor(Math.random() * numbers.length))

  // Добавляем как минимум один символ
  password += symbols.charAt(Math.floor(Math.random() * symbols.length))

  // Дополняем оставшуюся часть пароля случайными символами
  for (let i = password.length; i < length; i++) {
    const characters = uppercaseLetters + lowercaseLetters + numbers + symbols

    password += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return password
}
