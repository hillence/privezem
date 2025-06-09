export function formatDateToDDMMYYYY(date: Date | undefined | null, param: string) {
  // console.log(param, date)
  if (date === undefined || date === null) return ''

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  let formattedDate = `${day}.${month}.${year}`

  if (param === 'fromDate') {
    formattedDate += ' 00:00:00'
  } else {
    formattedDate += ' 23:59:59'
  }

  // console.log('formattedDate', param, formattedDate)

  return formattedDate
}
