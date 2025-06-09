import React, { useEffect, useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { useDebounce } from '../../../common/hooks/useDebounce'

import styles from './AdminPanelHeader.module.scss'

import { PATH, PathType } from 'app/routes/AppRoutes'
import {
  adminLogoutTC,
  selectedAdminData,
  selectedBuyerData,
  selectedSearchValue,
  selectedTab,
  setSearchValueAC,
} from 'app/store'
import { ReactComponent as LogoutIcon } from 'assets/icons/svgIcons/logoutIcon.svg'
import { ReactComponent as SearchIcon } from 'assets/icons/svgIcons/searchIcon.svg'
import { ReactComponent as SearchMobileIcon } from 'assets/icons/svgIcons/searchMobileIcon.svg'
import { ReactComponent as SettingsIcon } from 'assets/icons/svgIcons/settingsIcon.svg'
import { ReactComponent as WarehouseIcon } from 'assets/icons/svgIcons/warehouseDark.svg'
import { placeholderHandler } from 'common'
import { SearchModal, TopModal } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import { Button } from 'common/ui'

export const AdminPanelHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const activeTab = useAppSelector(selectedTab)
  const userData = useAppSelector(selectedAdminData)
  const buyerData = useAppSelector(selectedBuyerData)
  const searchValue = useAppSelector(selectedSearchValue)

  const [newValue, setNewValue] = useState<string>(searchValue)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const debouncedSearchValue = useDebounce(newValue, 700)
  const userName = buyerData.userFullName ?? userData.userFullName
  const placeholder = placeholderHandler(activeTab)
  const logoutHandler = () => {
    dispatch(adminLogoutTC())
  }

  // Функция для проверки, находится ли текущий путь в списке исключений
  const isPathExcluded = (currentPath: string) => {
    const excludedPathPatterns = [
      /\/admin-panel\/admin\/[^/]+$/, // для /admin-panel/admin/:orderId
      /\/admin-panel\/admin\/buyer\/[^/]+$/, // для /admin-panel/admin/buyer/:orderId
      /\/admin-panel\/buyer\/[^/]+$/, // для /admin-panel/buyer/:orderId
      /\/admin-panel\/manager\/[^/]+$/, // для /admin-panel/manager/:orderId
      /\/admin-panel\/add-card\/successful/,
      /\/admin-panel\/add-card\/failed/,
    ]

    return excludedPathPatterns.some(pattern => pattern.test(currentPath))
  }

  const disabledSearch = isPathExcluded(location.pathname) || activeTab === 'cards'

  const openSearchModalHandler = () => {
    if (!disabledSearch) setIsModalOpen(true)
  }

  const openMobileSearchModalHandler = () => {
    if (!disabledSearch) setIsModalOpen(true)
  }

  const closeSearchModalHandler = () => {
    setIsModalOpen(false)
  }

  const navigateHandler = (path: PathType) => {
    navigate(path)
  }

  useEffect(() => {
    dispatch(setSearchValueAC(debouncedSearchValue.trim()))
  }, [debouncedSearchValue])

  useEffect(() => {
    setNewValue(searchValue)
  }, [searchValue])

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.nameBox} onClick={() => navigateHandler(PATH.ADMIN_PANEL)}>
          <span>{userName}</span>
        </div>

        <div className={styles.searchBox} onClick={openSearchModalHandler}>
          <SearchIcon />
          <input
            placeholder={placeholder.inputPlaceholder}
            value={newValue}
            readOnly={true}
            disabled={disabledSearch}
          />
        </div>
        <div className={styles.actionBox}>
          <Button
            size="base"
            variant="transparent"
            className={styles.searchMobileButton}
            onClick={openMobileSearchModalHandler}
          >
            <SearchMobileIcon />
          </Button>
          {userData.role === 'Admin' && (
            <>
              <Button
                size="base"
                variant="transparent"
                onClick={() => navigateHandler(PATH.ADMIN_SETTINGS)}
                className={styles.logoutButton}
              >
                <SettingsIcon />
                <span>настройки</span>
              </Button>
              <Button
                size="base"
                variant="transparent"
                onClick={() => navigateHandler(PATH.ADMIN_WAREHOUSE)}
                className={styles.logoutButton}
              >
                <WarehouseIcon />
                <span>склады</span>
              </Button>
            </>
          )}
          <Button
            size="base"
            variant="white"
            onClick={logoutHandler}
            className={styles.logoutButton}
          >
            <LogoutIcon />
            <span>выйти</span>
          </Button>
        </div>
      </div>

      <TopModal isOpen={isModalOpen} closeHandler={closeSearchModalHandler}>
        <SearchModal
          value={newValue}
          onChange={setNewValue}
          placeholder={placeholder.modalPlaceholder}
          title={placeholder.modalTitle}
          closeHandler={closeSearchModalHandler}
        />
      </TopModal>
    </>
  )
}
