import { Link, useLocation } from 'react-router-dom'

import { FooterGap } from '../../components/FooterGap/FooterGap'
import { SectionId } from '../../utils/scrollToSection'

import styles from './ContactsSection.module.scss'
import { SocialLinks } from './SocialLinks'

import { PATH } from 'app/routes/AppRoutes'
import { ReactComponent as CedroIcn } from 'assets/icons/cedro.svg'
import width from 'assets/styles/widthContainer.module.scss'

const ContactsSection = () => {
  const location = useLocation()

  const isWorkingPage =
    location.pathname.includes(PATH.USER_ACCOUNT) ||
    location.pathname.includes(PATH.MY_CART) ||
    location.pathname.includes(PATH.ORDERING) ||
    location.pathname.includes(PATH.PASSWORD_RECOVERY) ||
    location.pathname.includes(PATH.MAIN)

  const getCurrentYear = () => {
    return new Date().getFullYear()
  }
  const currentYear = getCurrentYear()

  return (
    <section
      className={`${styles.section} ${!isWorkingPage ? styles.sectionExtraPage : ''}`}
      id={SectionId.CONTACTS}
    >
      <div className={`${width.base} ${width.footer}`}>
        <div className={styles.wrapper}>
          <div className={styles.main}>
            <b className={styles.mainTitle}>контакты</b>
            <ul className={styles.phones}>
              <li>
                <a className={styles.phonesEl} href="mailto:info@ohreally.ru">
                  info@ohreally.ru
                </a>
              </li>
              <li>
                <a className={styles.phonesEl} href="tel:+7(495)085-95-95">
                  +7 (495) 085-95-95
                </a>
              </li>
            </ul>
            <SocialLinks className={styles.socials} />
          </div>

          <div className={styles.footer}>
            <div className={styles.footerCopy}>&copy; {currentYear} Привезём</div>

            <div className={styles.footerMenu}>
              <ul className={styles.menu}>
                <li className={styles.menuItem}>
                  <Link to={PATH.PRIVACY_POLICY} className={styles.menuLink}>
                    Политика конфиденциальности
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={PATH.USER_AGREEMENT} className={styles.menuLink}>
                    пользовательское соглашение
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link to={PATH.PUBLIC_OFFER} className={styles.menuLink}>
                    Оферта
                  </Link>
                </li>
                {/* <li className={styles.menuItem}>
                  <Link to={PATH.REQUISITES} className={styles.menuLink}>
                    реквизиты
                  </Link>
                </li> */}
                <li className={styles.menuItem}>
                  <Link to={PATH.PAYMENT_AND_REFUND} className={styles.menuLink}>
                    оплата и возврат
                  </Link>
                </li>
                <li className={styles.menuItem}>
                  <Link
                    to={PATH.PRIVACY_POLICY + '#' + SectionId.COOKIES_POLICY}
                    className={styles.menuLink}
                  >
                    cookies
                  </Link>
                </li>
              </ul>
            </div>

            <div className={styles.footerCedro}>
              <a
                href="https://www.cedro.agency"
                target="_blank"
                rel="nofollow noreferrer noopener"
                className={styles.cedro}
              >
                <span className={styles.cedroText}></span>
                <CedroIcn className={styles.cedroIcn} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {isWorkingPage && <FooterGap />}
    </section>
  )
}

export default ContactsSection