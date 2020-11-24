/**
 * string to Uint8Array
 * @export
 * @param {string} str - string
 * @returns {Uint8Array}
 */
export default function toBufferSource(str: string) {
  return new Uint8Array(str.length).map((c, i) => str.charCodeAt(i))
}
