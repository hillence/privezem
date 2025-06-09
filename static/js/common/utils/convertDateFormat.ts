export const convertDateFormat = (
  inputDate: string | null,
  format: 'dd.mm.yyyy' | 'yyyy-mm-dd'
): string => {
  if (inputDate === null || inputDate === '') {
    return ''
  }

  let day, month, year

  if (inputDate.includes('.')) {
    // Формат dd.mm.yyyy
    ;[day, month, year] = inputDate.split('.')
  } else if (inputDate.includes('-')) {
    // Формат yyyy-mm-dd
    ;[year, month, day] = inputDate.split('-')
  } else {
    throw new Error('Неизвестный формат входной даты')
  }

  // Преобразование входной даты в формат yyyy-mm-dd для создания объекта Date
  const formattedInputDate = `${year}-${month}-${day}`

  const date = new Date(formattedInputDate)

  if (isNaN(date.getTime())) {
    throw new Error('Некорректная дата')
  }

  const formattedDay = date.getDate().toString().padStart(2, '0')
  const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0') // Месяцы начинаются с 0 в JavaScript
  const formattedYear = date.getFullYear()

  if (format === 'dd.mm.yyyy') {
    return `${formattedDay}.${formattedMonth}.${formattedYear}`
  } else if (format === 'yyyy-mm-dd') {
    return `${formattedYear}-${formattedMonth}-${formattedDay}`
  } else {
    throw new Error('Неизвестный формат даты')
  }
}
