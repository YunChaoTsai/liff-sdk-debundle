/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * get cookie value by key
 * @param  {string} key
 * @return {string}
 */
export default function get(key: string): string {
  const re = new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`)
  return document.cookie.replace(re, '$1')
}
