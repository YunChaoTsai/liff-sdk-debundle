import fetch from '../util/fetch'
import getEndPoint from '../util/getEndPoint'

interface Friendship {
  friendFlag: boolean
}
/**
 * get Friendship
 * https://developers.line.biz/en/reference/social-api/#get-friendship-status
 * @export
 * @returns {Promise<Friendship>}
 */
export default function getFriendship(): Promise<Friendship> {
  return fetch(getEndPoint('friendship'))
}
