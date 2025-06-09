import { MouseEvent } from 'react'

export const positionDefiner = (
  event: MouseEvent<HTMLDivElement>,
  popupHeight: number,
  popupWidth: number
) => {
  const statusElement = event.currentTarget as HTMLElement
  const rect = statusElement.getBoundingClientRect()

  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowWidth = window.innerWidth

  const yPositionTop = rect.top + scrollTop // Выравнивание по верхнему краю
  const yPositionBottom = rect.bottom + scrollTop // Выравнивание по нижнему краю

  let finalYPosition = yPositionBottom + 10 // Начальное значение с небольшим отступом снизу
  let finalXPosition = rect.left + (rect.width - popupWidth) / 2 // Центрирование попапа относительно кнопки

  // Коррекция по Y
  if (yPositionBottom + popupHeight > scrollTop + window.innerHeight) {
    finalYPosition = yPositionTop > popupHeight ? yPositionTop - popupHeight - 10 : scrollTop
  }

  // Коррекция по X
  if (finalXPosition < 0) {
    // Если попап выходит за левую границу экрана
    finalXPosition = 20 // Небольшой отступ от левого края
  } else if (finalXPosition + popupWidth > windowWidth) {
    // Если попап выходит за правую границу экрана
    finalXPosition = windowWidth - popupWidth - 20 // Небольшой отступ от правого края
  }

  // Адаптация к ширине экрана, если попап шире экрана
  if (popupWidth > windowWidth) {
    finalXPosition = (windowWidth - popupWidth) / 2 // Центрирование попапа на экране
  }

  return {
    x: finalXPosition,
    y: finalYPosition,
  }
}
