import isInClient from '../common/isInClient'
import { STORE_KEY } from '../util/consts'
import { getConfig } from './index'
import createError from '../util/createError'
import { INVALID_CONFIG } from '../util/consts'

/**
 * isInClient === true: sessionStorage
 * isInClient === false: localStroage
 * @export
 * @param {string} key
 * @param {*} value
 */
export default function remove(key: string): void {
  const config = getConfig()
  // [TODO] remove appId
  const liffId = config.liffId
  if (!liffId) {
    throw createError(INVALID_CONFIG, 'liffId is necessary for liff.init()')
  }
  const store = isInClient() ? sessionStorage : localStorage
  store.removeItem(`${STORE_KEY}:${liffId}:${key}`)
}
