import { call } from './bridge'
import checkFeature from './checkFeature'
import createError from '../util/createError'
import { FORBIDDEN } from '../util/consts'
/**
 * get advertising Id
 */
export default function getAdvertisingId(): Promise<any> {
  if (!checkFeature('getAdvertisingId')) {
    return Promise.reject(
      createError(FORBIDDEN, 'No promission for liff.getAdvertisingId()')
    )
  }
  return call('getAdvertisingId').then(
    (data): null | string => {
      return data.advertising
    }
  )
}
