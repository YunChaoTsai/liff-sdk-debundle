import createEvent from './createEvent'
import createError from '../../util/createError'
import { INVALID_ARGUMENT } from '../../util/consts'

/**
 * Wrap window.dispatchEevent
 * Expose `window.liff._dispatchEvent()` for client to interact with js
 * @param {string} json
 */
export default function dispatch(json: string): void {
  let detail = {}
  try {
    detail = JSON.parse(json)
  } catch (e) {
    throw createError(INVALID_ARGUMENT, e.message)
  }
  const event = createEvent(detail)
  window._log('[client dispatchEvent to js]', {
    type: event.type,
    detail: event.detail,
  })
  window.dispatchEvent(event)
}
