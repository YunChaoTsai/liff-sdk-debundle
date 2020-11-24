/**
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */

;(function(): void {
  if (typeof window.CustomEvent !== 'function') {
    function CustomEvent(event: string, params: any): Event {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      const evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }

    CustomEvent.prototype = Event.prototype
    window.CustomEvent = CustomEvent
  }
})()
