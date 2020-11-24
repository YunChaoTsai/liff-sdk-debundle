/**
 * @author JP23555
 */
const eventHandlers = {}

export function getEventHandlers(): { [k: string]: Function } {
  return eventHandlers
}

export default function listen(
  target: HTMLElement | HTMLDocument | Window,
  key: string,
  callback?: (e: Event) => void,
  options?: AddEventListenerOptions
): Promise<Event> {
  const [event] = key.split('.')

  return new Promise(
    (resolve): void => {
      eventHandlers[key] = function(e: Event): void {
        resolve(e)
        if (callback) {
          callback(e)
        }
      }
      target.addEventListener(event, eventHandlers[key], options)
    }
  )
}
