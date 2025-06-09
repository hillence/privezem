import React, { useEffect, useState } from 'react'

import UserAccount from '../UserAccount'

import styles from './MyAddresses.module.scss'

import {
  getAddressesTC,
  ModalType,
  selectedAddresses,
  selectedRootModalData,
  setRootModalDataAC,
  updateAddressTC,
} from 'app/store'
import { ReactComponent as PlusIcon } from 'assets/icons/svgIcons/plusIcon.svg'
import { AddressItem, RightModal, UserAddressModal } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'
import DeliveryAddress from 'types/delivery-address'

const MyAddresses = () => {
  const dispatch = useAppDispatch()
  const [editAddress, setEditAddress] = useState<DeliveryAddress | null>(null)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const userAddresses = useAppSelector(selectedAddresses)
  const rootModalData = useAppSelector(selectedRootModalData)

  const addAddressHandler = () => {
    openModalHandler('addAddress')
  }

  const updateAddressHandler = (address: DeliveryAddress) => {
    setEditAddress(address)
    openModalHandler('editAddress')
  }

  const setUpdatedAddress = (address: DeliveryAddress) => {
    const payload = {
      ...address,
      isDefault: address.isDefaultAddress,
    }

    dispatch(updateAddressTC(payload))
  }

  const openModalHandler = (type: ModalType) => {
    dispatch(setRootModalDataAC({ isOpen: true, modalType: type, direction: 'right' }))
  }

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(getAddressesTC())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  return (
    <UserAccount>
      <div className={styles.block}>
        <h3 className={styles.pageTitle}>мои адреса</h3>

        <div className={styles.contentBox}>
          {userAddresses.map(address => (
            <AddressItem
              key={address.addressId}
              address={address}
              setDefaultAddress={setUpdatedAddress}
              updateAddress={updateAddressHandler}
            />
          ))}

          <div key={'add'} className={styles.button} onClick={addAddressHandler}>
            <span>Добавить новый адрес</span>
            <PlusIcon className={styles.icon} />
          </div>
        </div>
      </div>

      <RightModal modalData={rootModalData} modalType={rootModalData.modalType}>
        {(rootModalData.modalType === 'addAddress' ||
          rootModalData.modalType === 'editAddress') && (
          <UserAddressModal modalType={rootModalData.modalType} editAddress={editAddress!} />
        )}
      </RightModal>
    </UserAccount>
  )
}

export default MyAddresses
