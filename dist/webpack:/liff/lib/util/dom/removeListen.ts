/**
 * @author JP23555
 */
import { getEventHandlers } from './listen'

export default function removeListen(target, key): void {
  const eventHandlers = getEventHandlers()
  const [event] = key.split('.')
  target.removeEventListener(event, eventHandlers[key])
  eventHandlers[key] = null
}
