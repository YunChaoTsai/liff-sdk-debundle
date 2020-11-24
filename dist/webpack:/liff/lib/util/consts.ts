// ERROR CODEs
// Try call server api without access token
export const UNAUTHORIZED = 'UNAUTHORIZED'
// Parameters are invalid
export const INVALID_ARGUMENT = 'INVALID_ARGUMENT'
// Failed to init LIFF SDK
export const INIT_FAILED = 'INIT_FAILED'
// Do not have enough permission
export const FORBIDDEN = 'FORBIDDEN'
// incorrect liff config
export const INVALID_CONFIG = 'INVALID_CONFIG'

// Failed to create new window/iframe
export const CREATE_SUBWINDOW_FAILED = 'CREATE_SUBWINDOW_FAILED'

// Exception happened in window/iframe
export const EXCEPTION_IN_SUBWINDOW = 'EXCEPTION_IN_SUBWINDOW'

// ID_TOKEN invalid
export const INVALID_ID_TOKEN = 'INVALID_ID_TOKEN'

// event name for js-client bridge
export const LIFF_EVENT = 'liffEvent'

// key of sessionStorage
export const STORE_KEY = 'LIFF_STORE'

// Permanent Link URL origin
export const PERMANENT_LINK_ORIGIN = `https://liff.${SERVER_END_POINT}/`

// sub key
export const STORE_OBJECT = {
  ACCESS_TOKEN: 'accessToken',
  DECODED_ID_TOKEN: 'decodedIDToken',
  FEATURE_TOKEN: 'featureToken',
  FEATURES: 'features',
  LOGIN_TMP: 'loginTmp',
  CONFIG: 'config',
  CONTEXT: 'context',
  EXPIRES: 'expires',
}
// DOM attribute used to distinguish elements created by LIFF
export const LIFF_ATTR_DOM = 'data-l-{0}'

// attribute for subwindow
export enum ROUTER_MODE {
  NONE = 'none',
  HASH = 'hash',
  HISTORY = 'history',
}
