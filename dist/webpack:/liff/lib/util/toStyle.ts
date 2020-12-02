export default function toStyle(styles: {}, important = true): string {
  let res = ''
  for (let prop in styles) {
    if (typeof styles[prop] === 'object') {
      if (prop.indexOf('@keyframes') >= 0) important = false
      res += `${prop}{${toStyle(styles[prop], important)}}`
    } else {
      res += `${prop}:${styles[prop]}${important ? '!important' : ''};`
    }
  }
  return res
}
