import LiffError from './LiffError'

/**
 * create custom liff error
 * @param  {string}    code    [description]
 * @param  {string}    message [description]
 * @return {LiffError}         [description]
 */
export default function createError(code: string, message?: string): LiffError {
  return new LiffError(code, message)
}
