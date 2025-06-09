import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { getPrivacyPolicyTC } from 'app/store/appReducer/thunks'
import { selectedPrivacyPolicy } from 'app/store/selectors/appSelectors'
import { scrollToSection, SectionId } from 'common'
import { DocumentComponent } from 'common/components/DocumentComponent/DocumentComponent'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'

const PrivacyPolicy = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
  const privacyPolicy = useAppSelector(selectedPrivacyPolicy)

  useEffect(() => {
    const hash = location.hash.substring(1)

    if (hash === SectionId.COOKIES_POLICY) {
      scrollToSection(hash, navigate, location.pathname, -105)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.hash])

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
    } else {
      dispatch(getPrivacyPolicyTC())
      document.body.setAttribute('data-jivosite-location', 'extra-page')
    }

    return () => {
      document.body.removeAttribute('data-jivosite-location')
    }
  }, [isFirstLoad])

  return <>{privacyPolicy && <DocumentComponent document={privacyPolicy} />}</>
}

export default PrivacyPolicy
