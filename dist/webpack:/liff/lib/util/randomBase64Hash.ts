import hexToBase64 from './hexToBase64'
/**
 * return random base64 hash string
 */
/**
 * return random base64 hex string
 * @param  {number} length [length of sting]
 * @return {string}        [base64 hex]
 */
export default function randomBase64Hash(length: number = 0): string {
  let hash = ''
  const count: number = Math.ceil(length / 12)
  for (let i: number = count; i > 0; i--) {
    hash = hash + '' + Math.random()
  }
  hash = hexToBase64(hash).substr(0, length)
  return hash
}
