import fetch from '../util/fetch'
import getEndPoint from '../util/getEndPoint'

interface Profile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}
/**
 * get user profile
 * @export
 * @returns {Promise<any>}
 */
export default function getProfile(): Promise<Profile> {
  return fetch(getEndPoint('profile'))
}
