mport React from 'react'

import styles from './AccountStatusCheckBox.module.scss'

import { RootAdminStatusType } from 'app/store'
import { CheckBoxItem, CheckBoxWrapper } from 'common/components'

type AccountStatusCheckBoxPropsType = {
  resetHandler?: () => void
  setFilterAccountStatus?: (value: RootAdminStatusType) => void
  changeAccountStatus?: (value: RootAdminStatusType) => void
  filterAccountStatus?: RootAdminStatusType
  isReset: boolean
}
export const AccountStatusCheckBox = (props: AccountStatusCheckBoxPropsType) => {
  const {
    resetHandler,
    setFilterAccountStatus,
    filterAccountStatus,
    isReset,
    changeAccountStatus,
  } = props

  const itemStatusHandler = (status: RootAdminStatusType) => {
    setFilterAccountStatus && setFilterAccountStatus(status)
    changeAccountStatus && changeAccountStatus(status)
  }

  const containerStyles = isReset ? styles.containerMax : styles.containerMin

  return (
    <CheckBoxWrapper reset={resetHandler} className={containerStyles} isReset={isReset}>
      <CheckBoxItem
        selectedStatus={filterAccountStatus ?? null}
        value={'active'}
        itemStatusHandler={itemStatusHandler}
        className={styles.item}
      />
      <CheckBoxItem
        selectedStatus={filterAccountStatus ?? null}
        value={'blocked'}
        itemStatusHandler={itemStatusHandler}
        className={styles.item}
      />
    </CheckBoxWrapper>
  )
}
