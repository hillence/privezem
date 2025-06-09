export const dateConverter = (date: string) => {
  if (!date) return date

  let dateParts: string[]

  if (date.includes('.')) {
    dateParts = date.split('.')
  } else if (date.includes('-')) {
    dateParts = date.split('-')
  } else {
    // Если разделитель не найден, можно вернуть оригинальную дату или выбрать другое действие
    return date
  }

  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ]

  const day = dateParts[0]
  const monthIndex = parseInt(dateParts[1]) - 1 // учитываем, что месяцы в JavaScript начинаются с 0
  const year = dateParts[2]

  // Формируем строку в нужном формате
  return `${day.replace(/^0+/, '')} ${monthNames[monthIndex]} ${year}`
}
