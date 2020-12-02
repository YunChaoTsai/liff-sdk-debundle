/**
 * @author JP23555
 */
import getEndPoint from '../util/getEndPoint'
import { ShareTargetPickerIFrame } from '../util/dom/ShareTargetPickerIframe'
import { ShareTargetPickerPopup } from '../util/dom/ShareTargetPickerPopup'
import createError from '../util/createError'
import {
  ROUTER_MODE,
  UNAUTHORIZED,
  CREATE_SUBWINDOW_FAILED,
  EXCEPTION_IN_SUBWINDOW,
} from '../util/consts'
import getOS from '../common/getOS'
import { getAccessToken } from '../store'
import isLoggedIn from '../auth/isLoggedIn'

/**
 * open a user picker screen in new window or iframe
 * @export
 * @param {string} routerMode
 * @returns {Promise<string|null>}
 */
export default async function userPicker(
  options: { routerMode: ROUTER_MODE } = { routerMode: ROUTER_MODE.NONE }
): Promise<string | null> {
  let picker
  const url = getEndPoint('userPicker')

  if (!isLoggedIn()) {
    throw createError(
      UNAUTHORIZED,
      'Need access_token for api call, Please login first'
    )
  }

  // initialize picker class
  try {
    const token = getAccessToken()
    if (getOS() === 'web') {
      picker = new ShareTargetPickerPopup(url, token, window)
    } else {
      picker = new ShareTargetPickerIFrame(url, token, window)
    }
    await picker.init(options.routerMode)
  } catch (e) {
    throw createError(CREATE_SUBWINDOW_FAILED, e.message)
  }

  // start watching until a user finishes choosing
  try {
    return await picker.start()
  } catch (e) {
    throw createError(EXCEPTION_IN_SUBWINDOW, e.message)
  }
}
