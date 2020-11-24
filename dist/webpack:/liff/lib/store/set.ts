import isInClient from '../common/isInClient'
import { STORE_KEY } from '../util/consts'
import { getConfig } from './index'
import createError from '../util/createError'
import { INVALID_CONFIG } from '../util/consts'

/**
 * isInClient === true: sessionStorage setter
 * isInClient === false: localStroage setter
 * @export
 * @param {string} key
 * @param {*} value
 */
export default function set(key: string, value: any): void {
  const config = getConfig()
  // [TODO] remove appId
  const liffId = config.liffId
  if (!liffId) {
    throw createError(INVALID_CONFIG, 'liffId is necessary for liff.init()')
  }
  const store = isInClient() ? sessionStorage : localStorage
  store.setItem(`${STORE_KEY}:${liffId}:${key}`, JSON.stringify(value))
}
