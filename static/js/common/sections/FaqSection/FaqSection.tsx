import React, { useEffect, useRef, useState } from 'react'

import { CenterModal } from '../../components'
import { useAppSelector } from '../../hooks/customHooks'
import { SectionId } from '../../utils/scrollToSection'

import styles from './FaqSection.module.scss'

import { FAQType } from 'app/store/appReducer/types'
import { selectedFAQ } from 'app/store/selectors/appSelectors'
import { ReactComponent as ArrowIcn } from 'assets/icons/arrow-down.svg'
import width from 'assets/styles/widthContainer.module.scss'

type faqItemType = {
  opened: number
  setOpened: Function
  index: number
  item: FAQType
}

const FaqSectionItem = (props: faqItemType) => {
  const { item, index, opened, setOpened } = props
  const contentEl = useRef<HTMLDivElement>(null)

  const toggleHandler = (index: number) => setOpened(opened === index ? 0 : index)

  const isCurrent = opened === index

  return (
    <li
      className={`${styles.listItem} ${isCurrent ? styles['is-active'] : ''}`}
      key={`faq-item-${index}`}
    >
      <div className={styles.listHead} onClick={() => toggleHandler(index)}>
        <b className={styles.listTitle}>{item.question}</b>
        <ArrowIcn className={`${styles.listIcn} ${isCurrent ? styles['is-active'] : ''}`} />
      </div>

      <div
        className={`${styles.listBody} ${isCurrent ? styles['is-active'] : ''}`}
        ref={contentEl}
        style={{ maxHeight: `${isCurrent ? contentEl.current?.scrollHeight : 0}px` }}
      >
        <div className={styles.listText} dangerouslySetInnerHTML={{ __html: item.answer }} />
      </div>
    </li>
  )
}

const FaqSection = () => {
  // const dispatch = useAppDispatch()
  const [opened, setOpened] = useState(0 as number)
  const [videoLink, setVideoLink] = useState('')
  const [isImgPreviewOpen, setIsImgPreviewOpen] = useState<boolean>(false)

  const faqListData = useAppSelector(selectedFAQ)

  const closeImgPreviewHandler = () => {
    setIsImgPreviewOpen(false)
  }
  const linkFinder = () => {
    const videoLink = document.getElementById('faq_video')

    if (videoLink) {
      setVideoLink(videoLink.getAttribute('href') as string)

      videoLink.addEventListener('click', e => {
        e.preventDefault()
        setIsImgPreviewOpen(true)
        // dispatch(setRootModalDataAC({ isOpen: true, modalType: 'iFrame', direction: 'center' }))
      })
    }
  }

  // console.log(videoLink)

  useEffect(() => {
    linkFinder()
  }, [opened])

  return (
    <section className={styles.section} id={SectionId.FAQ}>
      <div className={width.base}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Ответы на часто задаваемые вопросы</h2>

          <ul className={styles.list}>
            {faqListData &&
              faqListData.map((item, index) => (
                <FaqSectionItem
                  key={index}
                  opened={opened}
                  setOpened={setOpened}
                  item={item}
                  index={index}
                />
              ))}
          </ul>
        </div>
      </div>
      <CenterModal
        isOpen={isImgPreviewOpen}
        closeHandler={closeImgPreviewHandler}
        iconClassName={styles.iconBox}
      >
        <iframe
          title="faq video"
          className={styles.iframe}
          src={videoLink}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </CenterModal>
    </section>
  )
}

export default FaqSection