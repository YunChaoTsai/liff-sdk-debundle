import { call } from './bridge'

/**
 * close current window (liff app)
 */
export default function closeWindow(): void {
  call('closeWindow')
}
