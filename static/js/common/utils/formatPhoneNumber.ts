export function formatPhoneNumber(
  phoneNumber: string | null | undefined,
  isMasked: boolean
): string {
  if (phoneNumber === null || phoneNumber === undefined || phoneNumber === '') {
    // throw new Error('Phone number should not be null')
    return ''
  }

  // If isMasked is false and phoneNumber already contains a mask, remove the mask
  if (!isMasked && phoneNumber.includes('+')) {
    return phoneNumber.replace(/\D/g, '') // remove all non-digit characters
  }

  if (isMasked) {
    const parts = [
      phoneNumber.slice(0, 1),
      phoneNumber.slice(1, 4),
      phoneNumber.slice(4, 7),
      phoneNumber.slice(7, 9),
      phoneNumber.slice(9, 11),
    ]

    return `+${parts[0]} (${parts[1]}) ${parts[2]}-${parts[3]}-${parts[4]}`
  } else {
    return phoneNumber
  }
}
