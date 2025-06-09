import { useEffect, useRef, useState } from 'react'

import { Pic } from '../../ui'

import styles from './IndexJumbo.module.scss'
import IndexShops from './IndexShops/IndexShops'
import JumboSearch from './JumboSearch/JumboSearch'
import { JumboVideo } from './JumboVideo/JumboVideo'

import width from 'assets/styles/widthContainer.module.scss'
import { MainHeader } from 'common/components'
import { boutiquesData, shopsData } from 'common/data/shops'

type JumboBgType = string | false

const IndexJumbo = () => {
  const [hasBg, setHasBg] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [type, setType] = useState(0)

  const handleVideoLoaded = () => {
    setVideoLoaded(true)
  }

  const [bgType, setBgType] = useState<JumboBgType>()
  const [isFixedHead, setIsFixedHead] = useState<boolean>(false)
  const sectionRef = useRef<HTMLElement | null>(null)

  const handlerScroll = () => {
    const jumboHeight = sectionRef.current ? sectionRef.current.scrollHeight : 0
    const scroll = window.scrollY

    setIsFixedHead(scroll > jumboHeight - 98) // minus header height
  }

  useEffect(() => {
    window.addEventListener('scroll', () => handlerScroll())

    return window.removeEventListener('scroll', handlerScroll)
  }, [])

  const toggleBg = (item: HTMLLinkElement) => {
    const type = (item.dataset.type || false) as JumboBgType

    setBgType(type)
  }

  const hoverHandler = (e: React.MouseEvent): void => {
    setHasBg(true)
    toggleBg(e.currentTarget as HTMLLinkElement)
  }

  const leaveHandler = (): void => {
    setHasBg(false)
    setBgType(false)
  }

  return (
    <>
      <MainHeader isInverted={hasBg} isFixed={isFixedHead} />

      <section
        className={`${styles.section} ${hasBg ? styles['section--has-bg'] : ''}`}
        ref={sectionRef}
      >
        <JumboVideo videoLoaded={videoLoaded} handleVideoLoaded={handleVideoLoaded} />

        <div className={styles.bg}>
          <Pic
            className={styles.pic}
            path="./img/jumbo"
            name={bgType || ''}
            alt=""
            isLazy={false}
          />
        </div>

        <div className={width.base}>
          <div className={styles.wrapper}>
            <h1 className={`${styles.title} ${hasBg ? styles['title--invert'] : ''}`}>
              Заказывайте товары <br />
              {/* eslint-disable-next-line no-irregular-whitespace */}
              в Россию
            </h1>

            <JumboSearch className={styles.search} hasBg={hasBg} />

            <ul className={`${styles.types} ${hasBg ? styles['types--invert'] : ''}`}>
              {['Маркетплейсы', 'Бутики'].map((item, index) => (
                <li
                  key={`types-${index}`}
                  className={
                    type === index
                      ? `${styles['types__item']} ${styles['is-active']}`
                      : styles['types__item']
                  }
                  onClick={() => setType(index)}
                >
                  {item}
                </li>
              ))}
            </ul>

            {type === 0 && (
              <IndexShops
                items={shopsData}
                hoverHandler={hoverHandler}
                leaveHandler={leaveHandler}
              />
            )}
            {type === 1 && (
              <IndexShops
                items={boutiquesData}
                hoverHandler={hoverHandler}
                leaveHandler={leaveHandler}
              />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default IndexJumbo