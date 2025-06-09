export function formatSum(amount?: number | string) {
  if (!amount) return '0'

  const amountString = typeof amount === 'number' ? amount.toString() : amount

  return new Intl.NumberFormat('en-US').format(parseFloat(amountString)).replace(/,/g, ' ')
}
