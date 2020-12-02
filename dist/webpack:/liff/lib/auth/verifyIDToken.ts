import 'webcrypto-shim'
import decodeBase64URL from '../util/decodeBase64URL'
import toBufferSource from '../util/toBufferSource'
import fetch from '../util/fetch'
import getEndPoint from '../util/getEndPoint'
import createError from '../util/createError'
import { INVALID_ID_TOKEN } from '../util/consts'

async function fetchCerts() {
  // TODO:
  // need to fetch certs endpoint from .well-known/openid-configuration
  // will change this after the above api supports CORS.
  return await fetch(getEndPoint('certs'))
}

/**
 * verify ID Token in JWT format
 * @export
 * @param {string} idToken - string
 * @returns {Promise<Object>}
 */
export default async function verifyIDToken(
  idToken: string,
  liffClientId: string
) {
  const jwt = idToken.split('.')
  const [header, payload, signature] = jwt

  const headerJSON = JSON.parse(decodeBase64URL(header))
  const payloadJSON = JSON.parse(decodeBase64URL(payload))
  const signatureBuf = toBufferSource(decodeBase64URL(signature))
  const encodedBuf = toBufferSource(header + '.' + payload)

  // Get the remote key of same key ID from public signing keys
  const certs = await fetchCerts()
  const certsKey = certs.keys.find(key => key.kid === headerJSON.kid)

  if (certsKey) {
    // to fix importKey error in firefox, delete unnessary "alg"
    delete certsKey.alg
    const remotePublicKey = await crypto.subtle.importKey(
      'jwk',
      certsKey,
      { name: 'ECDSA', namedCurve: 'P-256' },
      false,
      ['verify']
    )
    if (headerJSON.alg !== 'ES256') {
      // Make sure if its algorithm is ECDSA
      throw createError(
        INVALID_ID_TOKEN,
        'Invalid algorithm of signature in ID Token'
      )
    }
    // Verify JWS signature with the key
    const verifyResult = await crypto.subtle.verify(
      { name: 'ECDSA', hash: { name: 'SHA-256' } },
      remotePublicKey,
      signatureBuf,
      encodedBuf
    )
    if (verifyResult) {
      // Verify other parameters
      const issInvalid = payloadJSON.iss !== 'https://access.line.me'
      const audInvalid = payloadJSON.aud !== liffClientId
      const expInvalid = payloadJSON.exp < Math.floor(Date.now() / 1000)

      if (issInvalid) {
        throw createError(INVALID_ID_TOKEN, 'Invalid "iss" value in ID Token')
      }
      if (audInvalid) {
        throw createError(INVALID_ID_TOKEN, 'Invalid "aud" value in ID Token')
      }
      if (expInvalid) {
        throw createError(INVALID_ID_TOKEN, 'Invalid "exp" value in ID Token')
      }
      return payloadJSON
    } else {
      throw createError(INVALID_ID_TOKEN, 'Failed to verify ID Token signature')
    }
  } else {
    throw createError(INVALID_ID_TOKEN, 'Invalid key id in ID Token')
  }
}
