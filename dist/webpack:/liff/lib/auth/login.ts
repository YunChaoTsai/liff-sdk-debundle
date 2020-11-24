// import getConfig from './getConfig'
import createCodeChallenge from './createCodeChallenge'
import createCodeVerifier from './createCodeVerifier'
import { setLoginTmp, getConfig } from '../store'
import qs from '../util/qs'
import getEndPoint from '../util/getEndPoint'
import randomBase64Hash from '../util/randomBase64Hash'
import createError from '../util/createError'
import { INVALID_CONFIG } from '../util/consts'

/**
 * Redirect to LINE login server
 * @export
 * @param {redirectUri?: string}} [loginConfig]
 */
export default function login(loginConfig?: { redirectUri?: string }): void {
  const codeVerifier = createCodeVerifier()
  const code_challenge = createCodeChallenge(codeVerifier)
  const config = getConfig()
  if (!config || !config.liffId) {
    throw createError(
      INVALID_CONFIG,
      'You need to define `liffId` for liff.login()'
    )
  }
  const loginParams: any = {
    app_id: config.liffId,
    state: randomBase64Hash(12),
    response_type: 'code',
    code_challenge_method: 'S256',
    code_challenge,
  }
  if (loginConfig && loginConfig.redirectUri) {
    loginParams.redirect_uri = loginConfig.redirectUri
  }
  // save in storage for requestAccessToken after redirected back from LINE login server
  setLoginTmp({ codeVerifier })

  // Redirect to LINE login server
  const url = getEndPoint('authorize') + '?' + qs.stringify(loginParams)
  window._log(`[Redirect] ${url}`)
  window.location.href = url
}
