import styles from './SocialLinks.module.scss'

import { ReactComponent as InstIcon } from 'assets/icons/social/instagram.svg'
import { ReactComponent as TgIcon } from 'assets/icons/social/telegram.svg'
import { ReactComponent as VkIcon } from 'assets/icons/social/vk.svg'
import { socialMedia } from 'common/data/socialMedia'

export const SocialLinks = (props: { className: string }) => {
  return (
    <ul className={`${styles.list} ${props.className}`}>
      {socialMedia.map((item, index) => {
        return (
          <li className={styles.item} key={`socials-${index}`}>
            <a
              className={styles.el}
              href={item.link}
              target="_blank"
              rel="nofollow noreferrer noopener"
            >
              {item.name === 'tg' && <TgIcon className={styles.icon} />}
              {item.name === 'vk' && <VkIcon className={styles.icon} />}
              {item.name === 'inst' && <InstIcon className={styles.icon} />}
            </a>
          </li>
        )
      })}
    </ul>
  )
}