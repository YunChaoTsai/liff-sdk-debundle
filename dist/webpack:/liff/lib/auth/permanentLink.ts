import createError from '../util/createError'
import { getConfig } from '../store/'
import { PERMANENT_LINK_ORIGIN } from '../util/consts'

let extraParams = ''

/**
 * Give developer ability to add extra params to permanent link.
 * Can be used for tracking parameters for example
 * @param {string} paramsToAdd - Extra params to add to permanent link
 */
const setExtraQueryParam = (paramsToAdd: string): void => {
  extraParams = encodeURIComponent(paramsToAdd)
}

/**
 * Create Permanent Link function.
 * @returns {string} - Generated permanent link
 */
const createUrl = (): string => {
  const { pathname, search, hash } = window.location
  const hashesToFilter = /^access_token|^feature_token|^context_token/
  const filteredHash = hash
    .substring(1)
    .split('&')
    // Remove LIFF tokens from hash.
    .filter((x): boolean => !hashesToFilter.test(x) && Boolean(x))
    .join('&')
  const query = search
    .substring(1)
    .split('&')
    .concat(extraParams)
    // Remove liff.state if it's present in search
    .filter((x): boolean => !/liff\.state/.test(x) && Boolean(x))
    .join('&')
  const curPath = `${pathname}${query ? `?${query}` : ''}${
    filteredHash ? `#${filteredHash}` : ''
  }`
  return `${PERMANENT_LINK_ORIGIN}${getConfig().liffId}${curPath}`
}

/**
 * Remove double slashes from decoded liff.state
 * @param {string} decodedState
 * @returns {string} - DecodedState with any double slashes removed
 */
const removeDoubleSlashes = (decodedState: string): string =>
  decodedState.replace(/\/{2,}/g, '/')

/**
 * Validate contents of decoded liff.state
 * @param {string} decodedState
 * @returns {boolean} - If liff.state is valide, returns true
 */
const validateState = (decodedState: string): boolean => {
  // Valid state must start with a slash and contain no instances of ../
  const invalidReg = /^(?!\/)|\/\./g
  return invalidReg.exec(decodedState) === null
}

/**
 * Decode liff.state
 * If valid, return decoded state (with any double slashes removed)
 * Else LiffError is thrown
 * @param {string} state - liff.state's value
 * @throws {LiffError}
 * @returns {string} - Decoded liff.state with any double slashes removed
 */
const decodeState = (state: string): string => {
  const decodedState = decodeURIComponent(state)
  if (!validateState(decodedState)) {
    throw createError('LIFF.STATE_INVALID', 'liff.state is invalid')
  }
  const filteredState = removeDoubleSlashes(decodedState)
  // Add LIFF Tokens to decoded state
  const currentHash = window.location.hash
  let tokenHash = ''
  if (currentHash) {
    const stateHashIndex = decodedState.indexOf('#')
    // Need to account for LIFF.states that contain a hash and add to decodedState
    const hashPrefix = stateHashIndex > 0 ? '&' : '#'
    tokenHash = `${hashPrefix}${currentHash.substring(1)}`
  }
  return filteredState.concat(tokenHash)
}

export { decodeState, createUrl, setExtraQueryParam }
