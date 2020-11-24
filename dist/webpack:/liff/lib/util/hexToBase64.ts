/**
 * Hex to Base64
 * copied from https://gist.github.com/GeorgioWan/16a7ad2a255e8d5c7ed1aca3ab4aacec
 * @param  {string} str [hex]
 * @return {string}     [base64]
 */
export default function hexToBase64(hex: string = ''): string {
  let result = ''
  hex
    .replace(/\r|\n/g, '')
    .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
    .replace(/ +$/, '')
    .split(' ')
    .forEach(
      (i: string): void => {
        result += String.fromCharCode(parseInt(i))
      }
    )
  return window.btoa(result)
}
