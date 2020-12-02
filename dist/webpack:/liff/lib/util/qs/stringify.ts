/**
 * Stringify object to url query string
 * @export
 * @param {{}} query - object
 * @returns {string} - query string
 */
export default function stringify(query: {}): string {
  return Object.keys(query)
    .map(
      (key: string): string => {
        const value: any = query[key]
        return (
          key +
          '=' +
          (typeof value === 'undefined' ? '' : encodeURIComponent(value))
        )
      }
    )
    .join('&')
  // .replace(/%20/g, '+')
}
