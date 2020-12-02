import { getExpireTime } from '../store'

export default function checkExpired(): boolean {
  const expired = getExpireTime()
  return !expired
}
