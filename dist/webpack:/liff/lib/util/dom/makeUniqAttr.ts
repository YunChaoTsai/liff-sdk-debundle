/**
 * @author JP23555
 */
import randomBase64Hash from '../randomBase64Hash'
import { LIFF_ATTR_DOM } from '../consts'

/**
 * make a new unique attribute for HTMLElement to distinguish the elements created by LIFF SDK
 * @param namespace
 */
export default function makeUniqAttr(namespace: Window = window): string {
  let uniq: string
  const getname = (): string => {
    uniq = LIFF_ATTR_DOM.replace('{0}', randomBase64Hash(6))
    return uniq
  }
  // until get a unique attribute, this loop will continue.
  // the loop is limited being called up to 100 times not to occur infinity loop
  for (
    let i = 1;
    i <= 100 && !!namespace.document.body.querySelector(`[${getname()}]`);
    i++
  ) {
    if (i === 100) {
      throw new Error("can't make a relavent name space for LIFF on HTML")
    }
  }
  return uniq
}
