/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @param {string}            key
 * @param {string | number}   value
 * @param {any}               [options]
 */
export default function set(
  key: string,
  value: string | number,
  options?: any
): void {
  let cookie = key + '=' + value
  if (options) {
    for (let k in options) {
      cookie += `; ${k}=${options[k]}`
    }
  }
  console.log('set cookie', cookie)
  document.cookie = cookie
}
