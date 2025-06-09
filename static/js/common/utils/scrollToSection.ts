import { PATH } from 'app/routes/AppRoutes'

export enum SectionId {
  COOKIES_POLICY = 'cookies-policy',
  FAQ = 'faqSection',
  CONTACTS = 'contactsSection',
}

export const scrollToSection = (
  sectionId: SectionId,
  navigate: Function,
  location: string,
  yOffset: number
) => {
  const isRedirect =
    location.startsWith(PATH.USER_ACCOUNT) ||
    location === PATH.MY_CART ||
    location === PATH.ORDERING ||
    location === PATH.PRIVACY_POLICY ||
    location === PATH.PUBLIC_OFFER ||
    location === PATH.PASSWORD_RECOVERY ||
    // location === PATH.REQUISITES ||
    location === PATH.PAYMENT_AND_REFUND ||
    location === PATH.USER_AGREEMENT

  const ms: number = 500

  const timeout = (ms: number) => {
    const timeoutId = setTimeout(() => {
      scrollToSection(sectionId, navigate, location, yOffset)

      return () => clearTimeout(timeoutId)
    }, ms)
  }
  const targetElement = document.getElementById(sectionId)

  if (sectionId === SectionId.FAQ && isRedirect && !targetElement) {
    navigate(PATH.MAIN)
    timeout(ms)
  }
  if (sectionId === SectionId.CONTACTS && !targetElement) {
    navigate(PATH.MAIN)
    timeout(ms)
  }
  if (!targetElement && sectionId === SectionId.COOKIES_POLICY) {
    navigate(PATH.PRIVACY_POLICY)
    timeout(ms)
  }
  if (targetElement && yOffset) {
    const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset

    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
