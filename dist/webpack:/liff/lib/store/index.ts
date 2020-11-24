import get from './get'
import set from './set'
import clean from './clean'
import remove from './remove'
import cookie from '../util/cookie'
import { STORE_KEY, STORE_OBJECT } from '../util/consts'

export default {
  get,
  set,
  remove,
  clean,
}

/**
 * helpers
 */

/**
 * liff config getter / setter [memory]
 */
let config = null
export function getConfig(): any {
  return config
}
export function setConfig(value: any): void {
  config = value
}

/**
 * features (string array of feature names) getter / setter [memory]
 */
let features = []
export function getFeatures(): string[] {
  return features
}
export function setFeatures(value: string[]): void {
  features = value
}

/**
 * temporary values for LINE Login getter / setter
 */
export function getLoginTmp(): any {
  return get(STORE_OBJECT.LOGIN_TMP)
}
export function setLoginTmp(value: any): void {
  set(STORE_OBJECT.LOGIN_TMP, value)
}
export function removeLoginTmp(): void {
  remove(STORE_OBJECT.LOGIN_TMP)
}

/**
 * accessToken getter / setter
 */
export function getAccessToken(): string | null {
  return get(STORE_OBJECT.ACCESS_TOKEN)
}
export function setAccessToken(value: string): void {
  set(STORE_OBJECT.ACCESS_TOKEN, value)
}
/**
 * decodedIDToken getter / setter
 */
export function getDecodedIDToken(): any | null {
  return get(STORE_OBJECT.DECODED_ID_TOKEN)
}
export function setDecodedIDToken(value: any): void {
  set(STORE_OBJECT.DECODED_ID_TOKEN, value)
}
/**
 * featureToken getter / setter
 */
export function getFeatureToken(): string | null {
  return get(STORE_OBJECT.FEATURE_TOKEN)
}
export function setFeatureToken(value: string): void {
  set(STORE_OBJECT.FEATURE_TOKEN, value)
}

/**
 * context getter / setter
 */
interface Context {
  type: 'utou' | 'room' | 'group' | 'none'
  utouId?: string
  roomId?: string
  groupId: string
  userId?: string
  viewType?: string
  accessTokenHash?: string
}
export function getContext(): Context | null {
  return get(STORE_OBJECT.CONTEXT)
}
export function setContext(value: Context): void {
  set(STORE_OBJECT.CONTEXT, value)
}

/**
 * special handle expire time in cookie
 */
export function setExpireTime(expires: Date): void {
  const config = getConfig()
  cookie.set(
    `${STORE_KEY}:${STORE_OBJECT.EXPIRES}:${config.liffId}`,
    expires.getTime(),
    {
      expires: expires.toUTCString(),
      path: '/',
    }
  )
}
export function getExpireTime(): string | null {
  const config = getConfig()
  return cookie.get(`${STORE_KEY}:${STORE_OBJECT.EXPIRES}:${config.liffId}`)
}
export function removeExpireTime(): void {
  const config = getConfig()
  cookie.remove(`${STORE_KEY}:${STORE_OBJECT.EXPIRES}:${config.liffId}`, {
    path: '/',
  })
}
