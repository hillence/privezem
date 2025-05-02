import React, { useEffect, useState } from 'react'

import styles from './JumboVideo.module.scss'

type JumboVideoProps = {
  videoLoaded?: boolean
  handleVideoLoaded?: () => void
}

export const JumboVideo = (props: JumboVideoProps) => {
  const { videoLoaded, handleVideoLoaded } = props

  const [isLoaded, setIsLoaded] = useState(videoLoaded)

  useEffect(() => {
    setIsLoaded(videoLoaded)
  }, [videoLoaded])

  const onCanPlayHandler = () => {
    setIsLoaded(true)
    handleVideoLoaded && handleVideoLoaded()
  }

  return (
    <video
      className={styles.bgVideo}
      loop
      muted
      autoPlay
      playsInline
      onCanPlay={onCanPlayHandler}
      style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
    >
      <source src={require('./jumboBg.mp4')} />
      {/*<source src={backgroundVideoWebm} type="video/webm" />*/}
      {/*<source src={backgroundVideoOgg} type="video/ogg" />*/}
      Ваш браузер не поддерживает видео.
    </video>
  )
}