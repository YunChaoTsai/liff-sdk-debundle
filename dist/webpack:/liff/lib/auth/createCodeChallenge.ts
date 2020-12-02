import sha256 from 'tiny-sha256'
import hexToBase64 from '../util/hexToBase64'

/**
 * createCodeChallenge for PKCE Login
 * @export
 * @param  {string} code_verifier
 * @return {string}
 */
export default function createCodeChallenge(code_verifier: string): string {
  return hexToBase64(sha256(code_verifier))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}
