import { setFeatures } from '../store'
import removeListener from './bridge/removeListener'
import addListenter from './bridge/addListener'

/**
 * listen to `ready` event from client
 * set client features in client callback
 * @export
 * @returns {Promise<any>}
 */
export default function ready(): Promise<any> {
  return new Promise(
    (resolve): void => {
      // detect whether has client injected `features` to webview
      if (window._liff && window._liff.features) {
        window._log('init from window._liff.features')
        setFeatures(window._liff.features)
        resolve()
      } else {
        window._log('cannot find window._liff.features, listen to ready event')
        // In old client or somehow client doesn't inject the `features`, listen to `ready` event
        // But still can't solve "ready event is fired before SDK addListener" in old client
        const readyHandler = (e): void => {
          window._log('ready event is fired')
          removeListener('ready', readyHandler)
          if (e && e.detail && e.detail.data && e.detail.data.features) {
            setFeatures(e.detail.data.features)
          }
          resolve()
        }
        addListenter('ready', readyHandler)
      }
    }
  )
}
