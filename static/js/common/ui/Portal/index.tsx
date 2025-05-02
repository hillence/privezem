import { ReactNode } from 'react'

import { createPortal } from 'react-dom'

const Portal = ({ children, selector = 'body' }: { children: ReactNode; selector?: string }) => {
  const parent = document.querySelector(selector) as HTMLDivElement

  return createPortal(children, parent)
}

export default Portal