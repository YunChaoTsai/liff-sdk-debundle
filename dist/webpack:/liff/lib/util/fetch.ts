import { getAccessToken } from '../store'
import { UNAUTHORIZED } from './consts'
import createError from './createError'

const handleRes = (res: any): Promise<any> => {
  if (res.ok) {
    try {
      return res.json()
    } catch {
      return res
    }
  }

  // parse error
  try {
    return res.json().then(
      (err): void => {
        throw createError(err.error, err.error_description || err.message)
      }
    )
  } catch {
    const err = createError(res.status, res.statusText)
    throw err
  }
}

export default function _fetch(url: string, options?: any): Promise<any> {
  let headers = {}
  if (!options || !options.headers) {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return Promise.reject(
        createError(
          UNAUTHORIZED,
          'Need access_token for api call, Please login first'
        )
      )
    }
    headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  }
  return fetch(url, {
    headers,
    ...options,
  }).then(handleRes)
}
