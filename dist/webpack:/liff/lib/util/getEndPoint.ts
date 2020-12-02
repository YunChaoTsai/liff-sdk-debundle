export function createUrl({
  subdomain = 'api',
  pathname,
}: {
  subdomain?: string
  pathname: string
}): string {
  return `https://${subdomain}.${SERVER_END_POINT}/${pathname}`
}

const endPointMap = {
  token: createUrl({ pathname: 'oauth2/v2.1/token' }),
  certs: createUrl({ pathname: 'oauth2/v2.1/certs' }),
  'openid-configuration': createUrl({
    subdomain: 'access',
    pathname: '.well-known/openid-configuration',
  }),
  authorize: createUrl({
    subdomain: 'access',
    pathname: 'liff/v1/authorize',
  }),
  profile: createUrl({ pathname: 'v2/profile' }),
  message: createUrl({ pathname: 'message/v3/share' }),
  messageOTT: createUrl({ pathname: 'message/v3/multisend?type=ott' }),
  friendship: createUrl({ pathname: 'friendship/v1/status' }),
  // to develop on local, comment out this line and launch by `yarn serve` on the line_web_login branch
  // userPicker: "http://localhost:8081/dist/shareTargetPicker.html",
  userPicker: createUrl({
    subdomain: 'access',
    pathname: 'oauth2/v2.1/liff/userPicker',
  }),
  // userPickerDomain: "*",
  userPickerDomain: createUrl({ subdomain: 'access', pathname: '' }),
}

export default function getEndPoint(key: string): string {
  return endPointMap[key] || ''
}
