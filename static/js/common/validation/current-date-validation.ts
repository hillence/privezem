export const validationDate = (value: string | undefined) => {
  if (!value) return false // Разрешаем пустое поле
  const regex = /^\d{2}\.\d{2}.\d{4}$/

  if (!regex.test(value)) {
    return false // Неверный формат
  }

  const parts = value.split('.')
  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1 // months are 0-indexed in JavaScript Date
  const year = parseInt(parts[2], 10)

  const inputDate = new Date(year, month, day)
  const today = new Date()

  // Reset the time part of today to 00:00:00 for a fair comparison
  today.setHours(0, 0, 0, 0)

  return !(
    (
      month < 0 ||
      month > 11 ||
      day < 1 ||
      day > 31 ||
      year < today.getFullYear() - 100 ||
      year > today.getFullYear() ||
      inputDate > today
    ) // the input date should not be later than today
  )
}