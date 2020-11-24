import './customEventPolyFill'
import { LIFF_EVENT } from '../../util/consts'

export default function createEvent(detail: any): CustomEvent {
  return new CustomEvent(LIFF_EVENT, { detail })
}
