import React, { ImgHTMLAttributes } from 'react'

import styles from './Image.module.scss'

import placeholder from 'assets/icons/imgPlaceholder_60.png'

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  isLazy?: boolean
}

const Image = (props: ImgProps) => {
  const { src, className, srcSet, alt, width, height, isLazy } = props

  return src ? (
    <img
      className={`${className || ''} ${styles.img}`}
      src={src}
      srcSet={srcSet}
      width={width}
      height={height}
      loading={isLazy ? 'lazy' : 'eager'}
      alt={alt || ''}
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const target = e.target as HTMLImageElement

        target.src = placeholder
      }}
    />
  ) : null
}

export default Image