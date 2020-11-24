import { LIFF_EVENT } from '../../util/consts'

export const callbacks = {}
let isListenerInited = false

/**
 * Initial browser listener to LIFF_EVENT for the first time.
 */
function initListener(): void {
  window.addEventListener(
    LIFF_EVENT,
    (e: CustomEvent): void => {
      if (e && e.detail && e.detail.type && callbacks[e.detail.type]) {
        callbacks[e.detail.type].forEach((callback): void => callback(e))
      }
    }
  )
}

type ClientCallback = (e: CustomEvent) => void

/**
 * Add callback to LIFFEvent listener.
 * @export
 * @param {string} type
 * @param {ClientCallback} callback
 */
export default function addListener(
  type: string,
  callback: ClientCallback
): void {
  if (!isListenerInited) {
    isListenerInited = true
    initListener()
  }
  if (callbacks[type]) {
    callbacks[type].push(callback)
  } else {
    callbacks[type] = [callback]
  }
}
