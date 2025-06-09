import React, { useEffect, useState } from 'react'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { PATH } from '../../app/routes/AppRoutes'
import UserPassport from '../../types/user-passport'
import { CartSummary } from '../MyCart/CartSummary/CartSummary'

import styles from './Ordering.module.scss'
import { OrderingAddress } from './OrderingAddress'
import { OrderingPassport } from './OrderingPassport'
import { OrderingRecipient } from './OrderingRecipient'

import { CreateOrderRequestType } from 'api/userAPI/cartAPI'
import {
  createOrderTC,
  getAddressesTC,
  getPassportDataTC,
  ModalType,
  selectedDeliveryPointAddress,
  selectedPaymentUrl,
  selectedRootModalData,
  setRootModalDataAC,
} from 'app/store'
import {
  selectedAddresses,
  selectedCart,
  selectedIsUseDiscount,
  selectedUserData,
  selectedUserId,
  selectedUserPassport,
} from 'app/store/selectors/userSelectors'
import width from 'assets/styles/widthContainer.module.scss'
import { getValidScheme } from 'common'
import { RightModal, UserAddressModal, UserPassportModal } from 'common/components'
import { useAppDispatch, useAppSelector } from 'common/hooks/customHooks'

export type PassportModalDataType = {
  addModalType: ModalType
  editModalType: ModalType
}

const Ordering = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const rootModalData = useAppSelector(selectedRootModalData)
  const addresses = useAppSelector(selectedAddresses)
  const userData = useAppSelector(selectedUserData)
  const userPassports = useAppSelector(selectedUserPassport)
  const userCart = useAppSelector(selectedCart)
  const isUseDiscount = useAppSelector(selectedIsUseDiscount)
  const paymentUrl = useAppSelector(selectedPaymentUrl)
  const deliveryPointAddress = useAppSelector(selectedDeliveryPointAddress)
  const currentAddress = addresses?.find(address => address.isDefaultAddress)
  const userId = useAppSelector(selectedUserId)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)
  const [editPassport, setEditPassport] = useState<UserPassport | null>(null)
  const [userPassport, setUserPassport] = useState<UserPassport | null>(null)
  const [isShowSwitch, setIsShowSwitch] = useState(false)

  const openModalTypes: PassportModalDataType = {
    addModalType: 'addPassport',
    editModalType: 'editPassport',
  } //for passports in CustomSelect

  const setDefaultPassportHandler = () => {
    const passport = userPassports.find(passport => passport.isDefault)

    if (passport) {
      setUserPassport(passport)
    }
  }

  const isPassportChanged = (
    prevPassport: UserPassport | null,
    nextPassport: UserPassport | null
  ) => {
    if (prevPassport && nextPassport) {
      return (
        prevPassport.country !== nextPassport.country ||
        prevPassport.number !== nextPassport.number ||
        prevPassport.issueDate !== nextPassport.issueDate ||
        prevPassport.unitCode !== nextPassport.unitCode ||
        prevPassport.whoGave !== nextPassport.whoGave ||
        prevPassport.birthdate !== nextPassport.birthdate ||
        prevPassport.gender !== nextPassport.gender
      )
    }
  }

  const formik = useFormik<CreateOrderRequestType>({
    initialValues: {
      address: {
        addressId: currentAddress?.addressId ? currentAddress.addressId.toString() : '',
        address: currentAddress?.address ? currentAddress.address : '',
        entrance: currentAddress?.entrance ? currentAddress.entrance : '',
        floor: currentAddress?.floor ? currentAddress.floor : '',
        flat: currentAddress?.flat ? currentAddress.flat : '',
        intercom: currentAddress?.intercom ? currentAddress.intercom : null,
        note: currentAddress?.note ? currentAddress.note : '',
        isDefaultAddress: currentAddress?.isDefaultAddress
          ? currentAddress.isDefaultAddress
          : false,
        isSaveAddress: false,
      },
      userData: {
        userName: userData?.userName ? userData.userName : '',
        userEmail: userData?.userEmail ? userData.userEmail : '',
        userPhone: userData?.userPhone ? userData.userPhone : '',
        isCallNeeded: userData?.isCallNeeded ? userData.isCallNeeded : false,
        communicationLink: userData?.communicationLink ? userData.communicationLink : '',
        communicationType: userData?.communicationType ? userData.communicationType : null,
        // birthdate: userData?.birthdate ? userData.birthdate : '',
        emailVerified: userData?.emailVerified ? userData.emailVerified : false,
      },
      userPassport: {
        id: userPassport?.id ? userPassport.id : null,
        // country: userPassport?.country ? userPassport.country : '',
        country: ' Российская Федерация',
        number: userPassport?.number ? userPassport.number : '',
        issueDate: userPassport?.issueDate ? userPassport.issueDate : '',
        unitCode: userPassport?.unitCode ? userPassport.unitCode : '',
        whoGave: userPassport?.whoGave ? userPassport.whoGave : '',
        birthdate: userData?.birthdate ? userData.birthdate : '', // birthdate from userData
        isSave: userPassport?.isSave ? userPassport.isSave : false,
        gender: userPassport?.gender ? userPassport.gender : undefined,
      },
      cart: userCart,
      isUseDiscount: isUseDiscount,
      deliveryMethod: 'courier',
      deliveryPointAddress: deliveryPointAddress ?? '',
    },
    validationSchema: getValidScheme('ordering'),
    onSubmit: (values: CreateOrderRequestType) => {
      dispatch(createOrderTC(values))
    },
  })

  // console.log('values', formik.values)

  const handleSubmit = () => {
    formik.handleSubmit()
  }

  const openPassportModalHandler = (type: ModalType, item?: UserPassport) => {
    if (item && type === 'editPassport') {
      setEditPassport(item)
      dispatch(setRootModalDataAC({ isOpen: true, modalType: type, direction: 'right' }))
    }
    if (type === 'addPassport') {
      setUserPassport({
        country: 'Российская Федерация',
        number: '',
        issueDate: '',
        unitCode: '',
        whoGave: '',
        birthdate: '',
        gender: undefined,
        isSave: false,
      })
    }
  }

  useEffect(() => {
    if (!isFirstLoad) {
      dispatch(getAddressesTC())
      dispatch(getPassportDataTC())

      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setIsFirstLoad(false)
    }
  }, [isFirstLoad])

  // console.log('checkTokenInCookie', checkTokenInCookie('BearerToken'))

  useEffect(() => {
    if (isPassportChanged(userPassport, formik.values.userPassport)) {
      setIsShowSwitch(true)
    } else {
      setIsShowSwitch(false)
    }
  }, [formik.values.userPassport])

  useEffect(() => {
    setDefaultPassportHandler()
  }, [userPassports])

  useEffect(() => {
    if (userPassport) {
      formik.setFieldValue('userPassport', userPassport)
    }
  }, [userPassport])

  useEffect(() => {
    if (!userId) {
      navigate(PATH.MY_CART)
    }
  }, [userId]) //todo - check if it's needed

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl
    }
  }, [paymentUrl])

  return (
    <section className={styles.section} id={'ordering'}>
      <div className={width.base}>
        <div className={styles.block}>
          <div className={styles.orderingBlock}>
            <OrderingAddress
              formik={formik}
              addresses={addresses}
              deliveryPointAddress={deliveryPointAddress}
            />

            <OrderingRecipient formik={formik} />
            <OrderingPassport
              formik={formik}
              modalTypes={openModalTypes}
              allPassports={userPassports}
              openPassportModalHandler={openPassportModalHandler}
              setUserPassport={setUserPassport}
              defaultPassport={userPassport}
              isShowSwitch={isShowSwitch}
            />
          </div>

          <CartSummary formik={formik} createOrder={handleSubmit} cart={userCart} />
        </div>
      </div>
      <RightModal modalData={rootModalData} modalType={rootModalData.modalType}>
        {rootModalData.modalType === 'editPassport' && (
          <UserPassportModal modalType={rootModalData.modalType} editPassport={editPassport} />
        )}
        {rootModalData.modalType === 'addAddress' && (
          <UserAddressModal modalType={rootModalData.modalType} />
        )}
      </RightModal>
    </section>
  )
}

export default Ordering
