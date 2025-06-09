import { AdminStatusType } from '../../app/store'

export const canEditProduct = (status: AdminStatusType): boolean => {
  return !(
    status === 'New' ||
    status === 'ForPayment' ||
    status === 'ReturnedByPayer' ||
    status === 'ReturnedByAdmin'
  )
}