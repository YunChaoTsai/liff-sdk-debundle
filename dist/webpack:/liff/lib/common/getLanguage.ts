/**
 * Get webview language
 * @export
 * @returns {string}
 */
let language: string
export default function getLanguage(): string {
  if (!language) {
    // Get language from userAgent
    language =
      Object.prototype.toString.call(navigator.languages) === '[object Array]'
        ? navigator.languages[0]
        : navigator.language
  }
  return language
}
