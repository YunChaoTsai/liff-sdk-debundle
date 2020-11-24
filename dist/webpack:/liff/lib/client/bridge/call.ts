import addListener from './addListener'
import removeListener from './removeListener'
import postMessage from './postMessage'
import { getFeatureToken } from '../../store'
import randomBase64Hash from '../../util/randomBase64Hash'
import createError from '../../util/createError'
import { FORBIDDEN } from '../../util/consts'

/**
 * call()
 * Let js pass event and data to client
 * and wait for callback
 * @export
 * @param {string} type        - name of event
 * @param {*} [params={}]      - data object to pass to client
 * @param {{                   - options
 *     callbackId?: string        - use randomly string by default, use `''` if client needs
 *     once?: boolean             - will remove listener once callback is fired if is true
 *   }} [options={
 *     once: true,
 *   }]
 * @returns {Promise<any>}
 */
export default function call(
  type: string,
  params: any = {},
  options: {
    callbackId?: string
    once?: boolean
  } = {
    once: true,
  }
): Promise<any> {
  // check whether feature token exists
  const featureToken = getFeatureToken()
  if (!featureToken) {
    return Promise.reject(
      createError(FORBIDDEN, 'Invalid featureToken for client features')
    )
  }

  options = {
    callbackId: randomBase64Hash(12),
    once: true,
    ...options,
  }

  return new Promise(
    (resolve, reject): void => {
      const callbackHandler = (e: CustomEvent): void => {
        if (e && e.detail) {
          // callbackId exist, then match. if not, just exec
          const { callbackId } = e.detail
          const hasCorrespondingCallbackId = callbackId === options.callbackId
          const callbackIdIsNotSet = typeof e.detail.callbackId !== 'string'
          if (hasCorrespondingCallbackId || callbackIdIsNotSet) {
            if (options.once) {
              removeListener(type, callbackHandler)
            }
            window._log('[callback detail]', e.detail)
            if (e.detail.error) {
              reject(e.detail.error)
            } else if (e.detail.data) {
              resolve(e.detail.data)
            } else {
              reject(e.detail)
            }
          }
        }
      }

      addListener(type, callbackHandler)
      postMessage(type, params, options.callbackId)
    }
  )
}
