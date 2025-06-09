import styles from '../components/userAccountComponents/StatusStagesComponent/StatusStagesComponent.module.scss'

import { RootStatusType } from 'app/store'

export const progressBarStylesIdentifier = (statusName: RootStatusType) => {
  switch (statusName) {
    case 'AwaitsUserPayment':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.icon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressHalfLine,
          orderPayed: styles.progressLine,
          orderHanded: styles.progressLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.status,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }

    case 'Paid':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressLine,
          orderHanded: styles.progressLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }
    case 'Processing':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressLine,
          orderHanded: styles.progressLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }
    case 'SendTOSortingCenter':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressHalfLine,
          orderHanded: styles.progressEmptyLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }
    case 'InSortingCenter':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressFullLine,
          orderHanded: styles.progressEmptyLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }
    case 'SendToDestination':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.activeIcon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressFullLine,
          orderHanded: styles.progressHalfLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.activeStatus,
          orderReceived: styles.status,
        },
      }
    case 'Delivered':
      return {
        iconStyles: {
          statusIcon: styles.activeIcon,
          creditCardIcon: styles.activeIcon,
          carIcon: styles.activeIcon,
          thumbsUpIcon: styles.activeIcon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressFullLine,
          orderPayed: styles.progressFullLine,
          orderHanded: styles.progressFullLine,
        },
        statusStyles: {
          orderPlaced: styles.activeStatus,
          orderPayed: styles.activeStatus,
          orderHanded: styles.activeStatus,
          orderReceived: styles.activeStatus,
        },
      }

    default:
      return {
        iconStyles: {
          statusIcon: styles.icon,
          creditCardIcon: styles.icon,
          carIcon: styles.icon,
          thumbsUpIcon: styles.icon,
        },
        progressLineStyles: {
          orderPlaced: styles.progressEmptyLine,
          orderPayed: styles.progressEmptyLine,
          orderHanded: styles.progressEmptyLine,
        },
        statusStyles: {
          orderPlaced: styles.status,
          orderPayed: styles.status,
          orderHanded: styles.status,
          orderReceived: styles.status,
        },
      }
  }
}
