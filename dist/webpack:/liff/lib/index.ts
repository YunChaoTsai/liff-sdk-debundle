window._log = ENV === 'production' ? (): void => {} : console.log

// polyfill
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'

import init from './init'

import getOS from './common/getOS'
import getVersion from './common/getVersion'
import getLanguage from './common/getLanguage'
import isInClient from './common/isInClient'

import isLoggedIn from './auth/isLoggedIn'
import login from './auth/login'
import logout from './auth/logout'

import { getAccessToken, getFeatures, getContext, getDecodedIDToken } from './store'
import {
  dispatch,
  call,
  postMessage,
  addListener,
  removeListener,
} from './client/bridge'
import checkFeature from './client/checkFeature'
import openWindow from './client/openWindow'
import closeWindow from './client/closeWindow'
import scanCode from './client/scanCode'
import getAdvertisingId from './client/getAdvertisingId'

import getProfile from './api/getProfile'
import sendMessages from './api/sendMessages'
import userPicker from './api/userPicker'
import getFriendship from './api/getFriendship'

import initPlugins from './plugin/initPlugins'
import { createUrl, setExtraQueryParam } from './auth/permanentLink'

const liff: any = {
  // core
  init,
  // common
  getOS,
  getVersion,
  getLanguage,
  isInClient,
  // auth
  isLoggedIn,
  login,
  logout,
  getAccessToken,
  getDecodedIDToken,
  getContext,
  // client
  openWindow,
  closeWindow,
  scanCode,
  getAdvertisingId,
  getFeatures,
  getFriendship,
  checkFeature,
  // http apis
  getProfile,
  sendMessages,
  userPicker,
  // plugin system
  initPlugins,
  // Permanent Link functionality
  permanentLink: {
    createUrl,
    setExtraQueryParam,
  },
  // private
  // expose window.liff._dispatchEvent() to LINE client
  _dispatchEvent: dispatch,
  // js-native bridge methods for custom event
  _call: call,
  _addListener: addListener,
  _removeListener: removeListener,
  _postMessage: postMessage,
}

export default liff
