import remove from './remove'
import { removeExpireTime } from './index'
import { STORE_OBJECT } from '../util/consts'

/**
 * remove all stored data
 */
export default function clean(): void {
  Object.keys(STORE_OBJECT).forEach(
    (key): void => {
      remove(STORE_OBJECT[key])
    }
  )
  removeExpireTime()
}
