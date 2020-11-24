/**
 * Parse url query string to object
 * @export
 * @param {string} search - query string
 * @returns {{}} - query object
 */
export default function parse(search: string): any {
  const arr: string[] = search
    .replace(/^\?/, '') // remove ?
    .replace(/^#\/?/, '') // remove # or #/
    .split(/&+/)
    .filter(x => x.length > 0)
  const query: any = arr.reduce((query: any, item: string): any => {
    const [key, value] = item.split('=')
    query[decodeURIComponent(key)] = decodeURIComponent(value)
    return query
  }, {})
  return query
}
