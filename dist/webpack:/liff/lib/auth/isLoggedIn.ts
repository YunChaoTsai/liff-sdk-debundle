import { getAccessToken } from '../store'

/**
 * Detect whether user is logged in by accessToken in sessionStorage
 * @export
 * @returns {boolean}
 */
export default function isLoggedIn(): boolean {
  return !!getAccessToken()
}
