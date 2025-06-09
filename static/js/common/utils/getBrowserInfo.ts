export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent
  const isDesktop =
    userAgent.toLowerCase().includes('windows') || userAgent.toLowerCase().includes('macintosh')

  if (isDesktop) {
    if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('OPR') === -1) {
      return 'Google_Chrome_Desktop'
    } else if (userAgent.indexOf('Firefox') !== -1) {
      return 'Mozilla_Firefox_Desktop'
    } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('OPR') === -1) {
      return 'Apple_Safari_Desktop'
    } else if (userAgent.indexOf('Edge') !== -1) {
      return 'Microsoft_Edge_Desktop'
    } else if (userAgent.indexOf('Opera') !== -1 || userAgent.indexOf('OPR') !== -1) {
      return 'Opera_Desktop'
    } else if (userAgent.indexOf('Trident') !== -1 || userAgent.indexOf('MSIE') !== -1) {
      return 'Internet_Explorer_Desktop'
    } else {
      return 'Unknown_Browser_Desktop'
    }
  } else {
    return 'Unknown_Browser_Mobile'
  }
}
