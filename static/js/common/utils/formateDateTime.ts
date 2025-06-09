type FormatType =
  | 'full'
  | 'onlyDate'
  | 'dateWithTime'
  | 'onlyTime'
  | 'dateWithTimeComma'
  | 'onlyShortDate'

export function formatDateTime(dateTimeStr: string | null | undefined, format: FormatType): string {
  if (!dateTimeStr) {
    return ''
  }

  const date = new Date(dateTimeStr)
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000 // получаем смещение часового пояса в миллисекундах

  date.setTime(date.getTime() - timezoneOffset)

  switch (format) {
    case 'full':
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
        .format(date)
        .replace(' г.', '')
    case 'onlyDate':
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
        .format(date)
        .replace(' г.', '')
    case 'dateWithTime':
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
        .format(date)
        .replace(' г.', '')
    case 'onlyTime':
      return new Intl.DateTimeFormat('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(date)
    case 'dateWithTimeComma': {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const hours = date.getHours()
      const minutes = date.getMinutes()

      return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}, ${
        hours < 10 ? '0' + hours : hours
      }:${minutes < 10 ? '0' + minutes : minutes}`
    }
    case 'onlyShortDate': {
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`
    }
    default:
      return dateTimeStr
  }
}
