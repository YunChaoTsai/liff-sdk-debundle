import store from '../store'
/**
 * clear sessionStorage
 * @export
 */
export default function logout(): void {
  store.clean()
}
