import randomBase64Hash from '../util/randomBase64Hash'
/**
 * createCodeVerifier for PKCE login
 * @export
 * @return {string}
 */
export default function createCodeVerifier(): string {
  return randomBase64Hash(43)
}
