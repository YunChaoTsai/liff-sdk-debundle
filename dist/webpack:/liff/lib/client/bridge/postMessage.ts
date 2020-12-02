import { getFeatureToken } from '../../store'
import createError from '../../util/createError'
import { FORBIDDEN, INVALID_ARGUMENT } from '../../util/consts'

/**
 * Wrappper of window._liff.postMessage
 * @export
 * @param {string} type             - name of message to client
 * @param {{}} [params={}]          - object data sent to client
 * @param {string} [callbackId='']  - callbackId to identify client callback
 */
export default function postMessage(
  type: string,
  params: {} = {},
  callbackId: string = ''
): void {
  // check whether feature token exists
  const featureToken = getFeatureToken()
  if (!featureToken) {
    throw createError(FORBIDDEN, 'Invalid featureToken for client features')
  }
  if (!window._liff && window._liff.postMessage) {
    throw createError(
      INVALID_ARGUMENT,
      'postMessage is not avaliable from client'
    )
  }

  window._log('[js postMessage to client]', type, callbackId, params)

  window._liff.postMessage(
    type,
    featureToken,
    callbackId,
    JSON.stringify(params)
  )
}
