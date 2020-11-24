import {
  setFeatureToken,
  setAccessToken,
  setDecodedIDToken,
  getLoginTmp,
  setExpireTime,
  setConfig,
  setContext,
  removeLoginTmp,
} from './store'
import isInClient from './common/isInClient'
import isLoggedIn from './auth/isLoggedIn'
import checkExpired from './auth/checkExpired'
import login from './auth/login'
import logout from './auth/logout'
import requestAccessToken from './auth/requestAccessToken'
import verifyIDToken from './auth/verifyIDToken'
import ready from './client/ready'
import parseContext from './client/parseContext'
import qs from './util/qs'
import LiffError from './util/LiffError'
import createError from './util/createError'
import { decodeState } from './auth/permanentLink'
import { INIT_FAILED, INVALID_CONFIG } from './util/consts'
import logToTorimochi from './logToTorimochi'

/**
 * liff.init() entry point of LIFF app
 * - get & store `accessToken` from url
 * - get & store `featureToken` from url
 * - handle `ready` event from LINE client if isInClient
 * - request accessToken from server (if has no `accessToken` in url or store && has `core` in url)
 * @export
 * @param { liffId: string } config
 * @param {Function} [successCallback]
 * @param {Function} [errorCallback]
 * @returns {Promise<any>}
 */
export default function init(
  config: { liffId: string },
  successCallback?: Function,
  errorCallback?: Function
): Promise<any> {
  const success =
    typeof successCallback === 'function'
      ? successCallback
      : Promise.resolve.bind(Promise)
  const error =
    typeof errorCallback === 'function'
      ? errorCallback
      : Promise.reject.bind(Promise)

  if (!config.liffId) {
    return error(
      createError(INVALID_CONFIG, 'liffId is necessary for liff.init()')
    )
  }

  setConfig(config)

  const hash = qs.parse(window.location.hash)
  const query = qs.parse(window.location.search)

  // Detected LIFF page is just redirected back from login server of LINE Login
  // Then requestAccessToken
  const loginTmp = getLoginTmp()
  const isRedirectedFromLoginServer =
    query.code && !isLoggedIn() && loginTmp && loginTmp.codeVerifier
  if (isRedirectedFromLoginServer) {
    return requestAccessToken()
      .then(
        (rawToken): Promise<any> => {
          setAccessToken(rawToken.access_token)
          setExpireTime(new Date(Date.now() + rawToken.expires_in * 1000))
          removeLoginTmp()
          const idToken = rawToken.id_token
          if (idToken) {
            return verifyIDToken(idToken, query.liffClientId).then(
              payloadJSON => {
                if (payloadJSON) {
                  setDecodedIDToken(payloadJSON)
                }
                return success()
              }
            )
          } else {
            return success()
          }
        }
      )
      .catch(
        (err: LiffError): void => {
          removeLoginTmp()
          return error(err)
        }
      )
  }

  // Handle error if it is redirected by Login Server with error in query
  if (query.error) {
    let errDesc = query.error_description.replace(/\+/g, ' ')
    const errMsg = `${query.error}: ${errDesc}`
    const err = createError(INIT_FAILED, errMsg)
    return error(err)
  }

  // Redirect LIFF App to permanent link location found in liff.state
  if (query['liff.state']) {
    try {
      const destination = decodeState(query['liff.state'])
      // Redirection is unnecessary if decoded state is equal to entry URL's
      if (destination && destination !== location.pathname) {
        location.replace(destination)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const isClient = isInClient()
  const canUseValidate =
    window._liff && typeof window._liff.validateFeatureToken === 'function'

  if (isClient) {
    // Parse and set all url hash tokens
    if (hash.context_token) {
      setContext(parseContext(hash.context_token))
    }
    // Save feature_token and access_token from hash upon initialization
    if (!isLoggedIn()) {
      // Return callback with error if tokens cannot be parsed
      if (!hash.feature_token || !hash.access_token) {
        // if no token in hash fragment, call LINE login flow
        login()
        return error(
          createError(
            INIT_FAILED,
            'Failed to parse feature_token or access_token'
          )
        )
      } else if (
        canUseValidate &&
        !window._liff.validateFeatureToken(config.liffId, hash.feature_token)
      ) {
        // if fail to validate feature_token in hash fragment, call LINE login flow
        login()
        return error(
          createError(INIT_FAILED, 'Failed to validate feature_token')
        )
      } else if (!canUseValidate && window.history.length > 1) {
        // In a case where `validateFeatureToken` is not provided by LINE client(< v9.8.0) and history.length > 1
        // There is a possibility that the token is abused, just send a log for analysis.
        logToTorimochi('potential abuser')
      } else {
        setFeatureToken(hash.feature_token)
        setAccessToken(hash.access_token)
      }
    }
    // Wait for `ready` event from LINE client
    return ready()
      .then((): void => success())
      .catch((err: LiffError): void => error(err))
  }

  // When in external browser
  // if accessToken is expired and logout
  if (isLoggedIn() && checkExpired()) {
    logout()
  }

  // Already loggedin or anonymous visit
  return success()
}
