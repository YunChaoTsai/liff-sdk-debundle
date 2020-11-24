const toJSONString = function(data) {
  let json = ''
  if (typeof data === 'object') {
    try {
      json = JSON.stringify(data)
    } catch (err) {
      json = data + ''
    }
  } else {
    json = data + ''
  }
  return json
}

const urlencode = function(url, data) {
  let params = Object.keys(data)
    .map(key => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        toJSONString(data[key])
      )}`
    })
    .join('&')
  let sep = url.indexOf('?') < 0 ? '?' : '&'
  return url + sep + params
}

class Beacon {
  private endpoint: string

  public constructor(endpoint) {
    this.endpoint = endpoint
  }

  public send(data: object, hitCallback?: Function) {
    let sent = false
    let image = document.createElement('img')
    image.width = 1
    image.height = 1
    if (typeof hitCallback === 'function') {
      image.onload = function() {
        if (!sent) {
          hitCallback(image)
          sent = true
        }
      }
      // timeout
      setTimeout(function() {
        if (!sent) {
          hitCallback(image)
          sent = true
        }
      }, 1500)
    }
    image.src = urlencode(this.endpoint, data)
  }
}

/**
 * logToTorimochi()
 * A method for sending logs in liff-sdk.
 * For example: collecting potential abuser events.
 * Here we only pick out the function of sending data in torimochi instead of using complete torimochi.js.
 * So we can avoid conflict with torimochi that is already on the LIFF App side.
 * @export
 * @param {string} msg
 * @returns {void}
 */
export default function logToTorimochi(msg: string, hitCallback?: Function) {
  const endpoint = 'https://torimochi.line-apps.com/1/req'
  const beacon = new Beacon(endpoint)
  let data = {
    cid: 'liff',
    eventType: 'debug',
    timestamp: Date.now(),
    logVersion: '1.6.9',
    threshold: 0,
    productKey: ENV === 'production' ? 'liff-real' : 'liff-beta',
    productVersion: 'latest',
    url: location.href,
    host: location.hostname,
    path: location.pathname,
    query: location.search,
    hash: location.hash,
    referrer: document.referrer,
    userId: 'liff',
    sessionId: 'none',
    sessionPath: '',
    sessionQuery: '',
    sessionTime: '0',
    sessionDuration: '0',
    sessionParams: {},
    touchX: '0',
    touchY: '0',
    scrollX: '0',
    scrollY: '0',
    windowX: '0',
    windowY: '0',
    targets: [],
    content: {
      debug: { message: msg },
    },
  }
  return beacon.send(data, hitCallback)
}
