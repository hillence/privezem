import { ReactNode } from 'react'

import { createPortal } from 'react-dom'

const PopupPortal = ({ children, id = 'status-popup' }: { children: ReactNode; id?: string }) => {
  const parent = document.getElementById(id) as HTMLDivElement

  return createPortal(children, parent)
}

export default PopupPortal