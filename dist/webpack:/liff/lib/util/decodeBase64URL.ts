/**
 * decode Base64URL
 * @export
 * @param {string} data - string
 * @returns {string}
 */
export default function decodeBase64URL(data: string): string {
  return window.atob(data.replace(/\-/g, '+').replace(/_/g, '/'))
}
