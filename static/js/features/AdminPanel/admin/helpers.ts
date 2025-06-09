import { GetEmployeeRequestType } from '../../../api/adminAPI/adminEmployeeAPI'

import { GetOrdersRequestType } from 'api/adminAPI/adminOrdersAPI'
import {
  CharacteristicsType,
  GenderType,
  RangeType,
  RootAdminStatusType,
  RootStatusType,
  UserRolesType,
} from 'app/store'
import { formatDateToDDMMYYYY } from 'common'

export const fromDateIsToday = (fromDate: Date | undefined | null) => {
  if (fromDate === null || fromDate === undefined) return false

  const today = new Date()

  return (
    fromDate.getDate() === today.getDate() &&
    fromDate.getMonth() === today.getMonth() &&
    fromDate.getFullYear() === today.getFullYear()
  )
}
// stuffPayloadCreator
export const stuffPC = (
  payload: GetEmployeeRequestType,
  fromDate: Date | undefined | null,
  toDate: Date | undefined | null,
  filterAccountStatus: RootAdminStatusType | null | undefined,
  filterUserRole: UserRolesType | null | undefined,
  filteredUserCharacteristic: CharacteristicsType | null | undefined,
  debouncedSearchValue: string | undefined,
  filteredGender: GenderType | null | undefined,
  filteredAges: RangeType | null | undefined,
  filteredPrices: RangeType | null | undefined
) => {
  const searchFromDate = formatDateToDDMMYYYY(fromDate, 'fromDate')
  const searchToDate = formatDateToDDMMYYYY(toDate, 'toDate')

  // if (!fromDateIsToday(fromDate)) {
  //   payload = { ...payload, fromDate: searchFromDate, toDate: searchToDate }
  // }
  if (fromDate !== null) {
    payload = { ...payload, fromDate: searchFromDate }
  }
  if (toDate !== null) {
    payload = { ...payload, toDate: searchToDate }
  }
  if (filterAccountStatus === 'blocked' || filterAccountStatus === 'active') {
    payload = { ...payload, blocked: filterAccountStatus === 'blocked' }
  }
  if (filterUserRole !== null) {
    payload = { ...payload, role: filterUserRole }
  }
  if (debouncedSearchValue !== '') {
    payload = { ...payload, searchValue: debouncedSearchValue }
  }
  if (filteredUserCharacteristic === 'UsersWithOrders') {
    payload = { ...payload, usersWithOrders: true }
  }
  if (filteredUserCharacteristic === 'UsersWithoutOrders') {
    payload = { ...payload, usersWithOrders: false }
  }
  if (filteredGender !== null) {
    payload = { ...payload, gender: filteredGender }
  }
  if (filteredAges !== null) {
    payload = { ...payload, age: filteredAges }
  }
  if (filteredPrices !== null) {
    payload = { ...payload, prices: filteredPrices }
  }

  return payload
}

// ordersPayloadCreator
export const ordersPC = (
  payload: GetOrdersRequestType,
  fromDate: Date | undefined | null,
  toDate: Date | undefined | null,
  statusForSearch: RootStatusType | null | undefined,
  debouncedSearchValue: string | null | undefined,
  filteredPrices: RangeType | null | undefined,
  filteredGender: GenderType | null | undefined
): GetOrdersRequestType => {
  const searchFromDate = formatDateToDDMMYYYY(fromDate, 'fromDate')
  const searchToDate = formatDateToDDMMYYYY(toDate, 'toDate')

  if (searchFromDate !== '') {
    payload = { ...payload, fromDate: searchFromDate }
  }
  if (searchToDate !== '') {
    payload = { ...payload, toDate: searchToDate }
  }
  if (statusForSearch) {
    payload = { ...payload, orderStatus: statusForSearch }
  }
  if (debouncedSearchValue !== '' && debouncedSearchValue !== null) {
    payload = { ...payload, searchValue: debouncedSearchValue }
  }
  if (filteredPrices !== null) {
    payload = { ...payload, prices: filteredPrices }
  }
  if (filteredGender !== null) {
    payload = { ...payload, gender: filteredGender }
  }

  return payload
}

// export const inPaymentOrdersPC = (payload: GetOrdersRequestType, debouncedSearchValue: string) => {
//   if (debouncedSearchValue !== '') {
//     payload = { ...payload, searchValue: debouncedSearchValue }
//   }
//
//   return payload
// }

// export const myOrdersPC = (payload: GetOrdersRequestType, debouncedSearchValue: string) => {
//   if (debouncedSearchValue !== '') {
//     payload = { ...payload, searchValue: debouncedSearchValue }
//   }
//
//   return payload
// }
