export const getExtensionUrl = (browser: string, id?: string) => {
  if (browser === 'Google_Chrome_Desktop') {
    return `https://chromewebstore.google.com/u/2/detail/ohreally/${id}`
  } else if (browser === 'Mozilla_Firefox_Desktop') {
    return `https://addons.mozilla.org/ru/firefox/addon/ohreally/`
  } else if (browser === 'Opera_Desktop') {
    return `https://chromewebstore.google.com/u/2/detail/ohreally/${id}`
  } else {
    return 'https://chromewebstore.google.com'
  }
}
