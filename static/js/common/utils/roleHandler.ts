import { CharacteristicsType, UserRolesType } from 'app/store'

export const roleHandler = (role: UserRolesType | CharacteristicsType) => {
  switch (role) {
    case 'Admin':
      return 'администратор'
    case 'Manager':
      return 'менеджер'
    case 'Buyer':
      return 'байер'
    case 'User':
      return 'пользователь'
    case 'UsersWithOrders':
      return 'пользователи с заказами'
    case 'UsersWithoutOrders':
      return 'пользователи без заказов'
    default:
      return 'пользователь'
  }
}
