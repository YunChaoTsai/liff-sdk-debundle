import fetch from '../util/fetch'
import getEndPoint from '../util/getEndPoint'
import { INVALID_ARGUMENT } from '../util/consts'
import createError from '../util/createError'

/**
 * the options to choose the way to send message in sendMessages method
 * none: send a message to context
 * ott: send messages to users binded to One-Time-Token (can send up to 10 ppl/group)
 */
export enum SendMessagesOptionsType {
  none = 'none',
  ott = 'ott',
}

export type SendMessagesParams = { type: string; text: string }[]
export interface SendMessagesOptions {
  type: SendMessagesOptionsType
  token: string
}

/**
 * send a message to context or send messages to users binded to One-Time-Token
 * @export
 * @param {Array<{type: string, text: string, }>} messages
 * @returns {Promise<any>}
 */
export default function sendMessages(
  messages: SendMessagesParams,
  options?: SendMessagesOptions
): Promise<any> {
  if (
    options &&
    options.type &&
    options.type !== SendMessagesOptionsType.none
  ) {
    if (options.type === SendMessagesOptionsType.ott && options.token.length) {
      return fetch(getEndPoint('messageOTT'), {
        method: 'POST',
        body: JSON.stringify({
          token: options.token,
          messages,
        }),
      })
    } else {
      throw createError(INVALID_ARGUMENT, 'incorrect ')
    }
  } else {
    return fetch(getEndPoint('message'), {
      method: 'POST',
      body: JSON.stringify({ messages }),
    })
  }
}
