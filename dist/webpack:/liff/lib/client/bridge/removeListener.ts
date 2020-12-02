import { callbacks } from './addListener'

/**
 * Remove callback from LIFFEvent listener.
 * @param {string}   type     [description]
 * @param {Function} callback [description]
 */
export default function removeListener(type: string, callback: Function): void {
  const _callbacks = callbacks[type]
  if (_callbacks && Array.isArray(_callbacks)) {
    const indexToBeRemoved = _callbacks.indexOf(callback)
    if (indexToBeRemoved >= 0) {
      _callbacks.splice(indexToBeRemoved, 1)
    }
  }
}
