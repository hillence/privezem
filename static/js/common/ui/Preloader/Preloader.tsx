import React from 'react'

import styles from './Preloader.module.scss'

import { ReactComponent as Logo } from 'assets/icons/svgIcons/preloader.svg'

export const Preloader = (props: PreloaderPropsType) => {
  const { isDomLoaded } = props

  return (
    <>
      <div
        className={`${styles.container} ${isDomLoaded ? styles.containerDisappear : ''}`}
        id={'preloader-box'}
      />
      <div className={`${styles.contentBox} ${isDomLoaded ? styles.contentBoxDisappear : ''}`}>
        <Logo className={`${styles.logo} ${styles.appear}`} />
        <div className={`${styles.progressBar} ${styles.progressBarAppear}`}>
          <div className={`${styles.progress}  ${isDomLoaded ? styles.progressAnimation : ''}`} />
        </div>
      </div>
    </>
  )
}

type PreloaderPropsType = {
  isDomLoaded: boolean
}