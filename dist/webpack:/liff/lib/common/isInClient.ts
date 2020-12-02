/**
 * Detect whether is in LINE client
 * @export
 * @returns {boolean}
 */
export default function isInClient(): boolean {
  return !!(window._liff && window._liff.postMessage)
}
