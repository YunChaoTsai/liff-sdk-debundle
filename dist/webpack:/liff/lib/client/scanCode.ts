import { call } from './bridge'
import checkFeature from './checkFeature'
import createError from '../util/createError'
import { FORBIDDEN } from '../util/consts'

/**
 * open scan qr code appview
 */
interface ScanCodeResult {
  value: string | null
}
export default function scanCode(): Promise<ScanCodeResult> {
  if (!checkFeature('scanCode')) {
    return Promise.reject(
      createError(FORBIDDEN, 'No promission for liff.scanCode()')
    )
  }
  return call('scanCode')
}
