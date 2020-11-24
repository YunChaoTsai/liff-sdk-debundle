/**
 * Detect OS
 * @export
 * @returns {OS}
 */
type OS = 'ios' | 'android' | 'web'
let os: OS
export default function getOS(): OS {
  if (!os) {
    const ua = window.navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      os = 'ios'
    } else if (/android/.test(ua)) {
      os = 'android'
    } else {
      os = 'web'
    }
  }
  return os
}
