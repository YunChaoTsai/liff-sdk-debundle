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
 * @return {*}
 */
export default function get(key: string): any {
  const config = getConfig()
  // [TODO] remove appId
  const liffId = config.liffId
  if (!liffId) {
    throw createError(INVALID_CONFIG, 'liffId is necessary for liff.init()')
  }
  const store = isInClient() ? sessionStorage : localStorage
  const rawData = store.getItem(`${STORE_KEY}:${liffId}:${key}`)
  try {
    return JSON.parse(rawData)
  } catch {
    return null
  }
}
