import { call } from './bridge'
import createError from '../util/createError'
import { INVALID_ARGUMENT } from '../util/consts'
import isInClient from '../common/isInClient'

export interface OpenWindowParams {
  url: string
  external?: boolean
}

/**
 * openWindow()
 * @export
 * @param {OpenWindowParams} params
 * @returns {Promise<any>}
 */
export default function openWindow(params: OpenWindowParams): void {
  if (
    !params ||
    typeof params.url !== 'string' ||
    params.url === '' ||
    (typeof params.external !== 'undefined' &&
      typeof params.external !== 'boolean')
  ) {
    throw createError(
      INVALID_ARGUMENT,
      'Invalid parameters for liff.openWindow()'
    )
    return
  }
  if (isInClient()) {
    call('openWindow', params)
  } else {
    // in external browser
    window.open(params.url, '_blank')
  }
}
