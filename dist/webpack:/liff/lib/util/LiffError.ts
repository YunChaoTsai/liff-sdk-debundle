/**
 * Custom Liff Error with code & message
 * @param {string} code
 * @param {string} message
 */

export default class LiffError extends Error {
  public code: string | number
  public constructor(code: string | number, message: string) {
    super(message)
    this.code = code
  }
}
