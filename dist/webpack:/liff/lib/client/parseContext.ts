// parse context from hash string

export default function parseContext(contextStr: string): any {
  const arr = contextStr.split('.')
  if (arr[1]) {
    try {
      const conext = JSON.parse(window.atob(arr[1]))
      return conext
    } catch {
      return null
    }
  }
  return null
}
