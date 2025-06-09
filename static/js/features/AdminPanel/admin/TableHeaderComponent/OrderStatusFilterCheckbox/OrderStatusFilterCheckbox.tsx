import React from 'react'

import styles from './OrderStatusFilterCheckbox.module.scss'

import { RootAdminStatusType } from 'app/store/adminReducer/types'
import { CheckBoxItem, CheckBoxWrapper } from 'common/components'
import { PopupCheckBoxType } from 'types/popup-types'

type CheckboxPropsType = {
  selectedStatus: RootAdminStatusType | null
  selectedOrderId?: number | null
  searchStatusHandler?: (status: RootAdminStatusType) => void
  changeStatusHandler?: (status: RootAdminStatusType) => void
  resetHandler: () => void
  statusForSearch?: RootAdminStatusType
  isReset: boolean
  type: PopupCheckBoxType
}
export const OrderStatusFilterCheckbox = (props: CheckboxPropsType) => {
  const {
    selectedStatus,
    selectedOrderId,
    changeStatusHandler,
    searchStatusHandler,
    resetHandler,
    statusForSearch,
    isReset,
    type,
  } = props
  const itemStatusHandler = (status: RootAdminStatusType) => {
    if (selectedOrderId && selectedStatus) {
      changeStatusHandler && changeStatusHandler(status)
    } else {
      searchStatusHandler && searchStatusHandler(status)
    }
  }

  const currentStatus = statusForSearch ? statusForSearch : selectedStatus

  return (
    <CheckBoxWrapper reset={resetHandler} className={styles.container} isReset={isReset}>
      {type === 'searchStatus' && (
        <>
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'AwaitsUserPayment'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'New'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'ForPayment'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'TakenByBuyer'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'ReturnedByPayer'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'Paid'}
            itemStatusHandler={itemStatusHandler}
          />
        </>
      )}
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'PaymentConfirmed'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'SendTOSortingCenter'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'InSortingCenter'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'SendToDestination'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'Delivered'}
        itemStatusHandler={itemStatusHandler}
      />
      {type === 'searchStatus' && (
        <>
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'Cancelled'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'ReturnedByAdmin'}
            itemStatusHandler={itemStatusHandler}
          />
          <CheckBoxItem
            selectedStatus={currentStatus}
            value={'NotPaidByUser'}
            itemStatusHandler={itemStatusHandler}
          />
        </>
      )}
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'ReturnUnderConsideration'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'ReturnApproved'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'ReturnOnTheWay'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'ReturnMoneyTransferred'}
        itemStatusHandler={itemStatusHandler}
      />
      <CheckBoxItem
        selectedStatus={currentStatus}
        value={'ReturnNotExecuted'}
        itemStatusHandler={itemStatusHandler}
      />
    </CheckBoxWrapper>
  )
}
