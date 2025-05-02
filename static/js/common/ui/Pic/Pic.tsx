import { ImgHTMLAttributes, SourceHTMLAttributes } from 'react'

import styles from './Pic.module.scss'

// TODO: Add WEBP

interface PictureProps extends ImgHTMLAttributes<HTMLImageElement> {
  path: string
  name: string
  format?: string
  isLazy?: boolean
  sources?: SourceProps[]
}
interface SourceProps extends SourceHTMLAttributes<HTMLSourceElement> {
  path?: string
  name: string
  format?: string
}

const Pic = (props: PictureProps) => {
  const { path, name, format = 'jpg', className, alt, width, height, isLazy, sources } = props

  return (
    <picture className={`${className || ''} ${styles.pic}`}>
      {sources &&
        sources.map((source, index) => {
          return (
            <source
              key={index}
              type={`image/${source.format || format}`}
              media={`(max-width: ${source.media}px)`}
              srcSet={`/img/${source.path || path}/${source.name}.${
                source.format || format
              }, /img/${source.path || path}/${source.name}@2x.${source.format || format} 2x`}
            />
          )
        })}

      <img
        src={`/${path}/${name}.${format}`}
        srcSet={format === 'svg' ? undefined : `/${path}/${name}@2x.${format} 2x`}
        width={width}
        height={height}
        loading={isLazy ? 'lazy' : 'eager'}
        alt={alt || ''}
      />
    </picture>
  )
}

export default Pic