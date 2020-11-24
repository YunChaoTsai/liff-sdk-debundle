import { getConfig } from '../store'
import { getLoginTmp } from '../store'
import fetch from '../util/fetch'
import qs from '../util/qs'
import getEndPoint from '../util/getEndPoint'

/**
 * Request OAuth server to issue access_token
 * API Reference https://wiki.linecorp.com/pages/viewpage.action?pageId=867206036#Login&OAuthv2.1-PUBLICIssueUserAccessToken
 * @export
 * @returns {Promise<any>}
 */
export default function requestAccessToken(): Promise<any> {
  const config = getConfig()
  const query = qs.parse(window.location.search)
  const loginTmp = getLoginTmp()
  const postData = {
    grant_type: 'authorization_code',
    client_id: query.liffClientId,
    appId: config.liffId,
    code: query.code,
    code_verifier: loginTmp.codeVerifier,
    redirect_uri: config.redirectUri || query.liffRedirectUri,
    id_token_key_type: 'JWK',
  }
  const body = qs.stringify(postData)
  return fetch(getEndPoint('token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body,
  })
}
