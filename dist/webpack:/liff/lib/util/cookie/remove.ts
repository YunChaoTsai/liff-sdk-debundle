/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
 * @param {string}            key
 * @param {any}               [options]
 */
export default function remove(key: string, options?: any): void {
  let cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  if (options) {
    for (let k in options) {
      cookie += `; ${k}=${options[k]}`
    }
  }
  document.cookie = cookie
}
