import { RootStatusType } from 'app/store/adminReducer/types'

export const statusIdentifier = (status: RootStatusType) => {
  switch (status) {
    //user statuses
    case 'AwaitsUserPayment':
      return {
        name: 'ожидает оплаты',
        background: '#b4b4b4',
      }
    case 'Paid':
      return {
        name: 'оплачен',
        background: '#FF852B',
      }
    case 'Processing':
      return {
        name: 'в обработке',
        background: '#EBBB14',
      }
    case 'SendTOSortingCenter':
      return {
        name: 'отправлен в сц',
        background: '#2A8AFA',
      }
    case 'InSortingCenter':
      return {
        name: 'поступил в сц',
        background: '#454DE7',
      }
    case 'SendToDestination':
      return {
        name: 'отправлен в пункт назначения',
        background: '#A833EF',
      }
    case 'Delivered':
      return {
        name: 'доставлен',
        background: '#62C554',
      }
    case 'Cancelled':
      return {
        name: 'отменен',
        background: '#D73B48',
      }
    case 'NotPaidByUser':
      return {
        name: 'не оплачен, отменен',
        background: '#e10a1b',
      }

    //admin statuses
    case 'New':
      return {
        name: 'новый',
        background: 'rgba(20, 24, 36, 0.40)',
      }
    case 'PaymentConfirmed':
      return {
        name: 'оплата проверена',
        background: '#62C554',
      }
    case 'ForPayment':
      return {
        name: 'на оплату',
        background: '#FF852B',
      }
    case 'TakenByBuyer':
      return {
        name: 'взят байером',
        background: '#ecbd1c',
      }
    case 'ReturnedByPayer':
      return {
        name: 'возвращен байером',
        background: '#ee5864',
      }
    case 'ReturnedByAdmin':
      return {
        name: 'возвращен менеджеру',
        background: 'rgba(241,31,127,0.89)',
      }
    //return statuses
    case 'ReturnUnderConsideration':
      return {
        name: 'на рассмотрении',
        background: 'rgba(20, 24, 36, 0.40)',
      }
    case 'ReturnApproved':
      return {
        name: 'одобрен',
        background: '#EBBB14',
      }
    case 'ReturnOnTheWay':
      return {
        name: 'возврат в пути',
        background: '#FF852B',
      }
    case 'ReturnMoneyTransferred':
      return {
        name: 'деньги отправлены',
        background: '#62C554',
      }
    case 'ReturnNotExecuted':
      return {
        name: 'возврат не выполнен',
        background: '#D73B48',
      }
    //bonus statuses
    case 'Received':
      return {
        name: 'получена',
        background: '#62C554',
      }
    case 'Pending':
      return {
        name: 'ожидается',
        background: '#EBBB14',
      }
    case 'Used':
      return {
        name: 'использована',
        background: '#62C554',
      }
    //account statuses
    case 'active':
      return {
        name: 'Активен',
        background: '#62C554',
      }
    case 'blocked':
      return {
        name: 'Заблокирован',
        background: '#D73B48',
      }

    //default
    default:
      return {
        name: 'not defined',
        background: '#f10216',
      }
  }
}
