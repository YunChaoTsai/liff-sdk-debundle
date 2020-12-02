/**
 * The style declarations for outer frame of userpicker
 * These each styles are put `imporant` keyword as postfix
 * @author jp23555
 */
export default (uniq: string): {} => ({
  [`[${uniq}]`]: {
    margin: 0,
    padding: 0,
    border: 0,
    width: '100vw',
    'font-size': '100%',
    font: 'inherit',
    'vertical-align': 'baseline',
    'box-size': 'border-box',
    display: 'block',
    position: 'initial',
    all: 'initial',
  },
  [`.liff-wrap[${uniq}]`]: {
    position: 'relative',
    'z-index': 10000,
  },
  [`.liff-wrap_in[${uniq}]`]: {
    position: 'fixed',
    width: '100vw',
    border: 'none',
    'overflow-x': 'hidden',
    'overflow-y': 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    'z-index': 10000,
    '-webkit-overflow-scrolling': 'touch',
    'background-color': 'white',
  },
  [`.liff-button-area[${uniq}]`]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '8px 16px',
    background: '#ffffff',
    'background-color': 'white',
    'z-index': 10001,
    display: 'flex',
    'justify-content': 'center',
  },
  [`.liff-button-area[${uniq}] > button`]: {
    flex: '0 1 100%',
    height: '45px',
    'margin-right': '7.5px',
    border: 'none',
    'border-radius': '5px',
    color: '#6c7985',
    'background-color': '#dee5ec',
    'font-weight': 600,
    'line-height': '20px',
    'font-size': '16px',
    'text-decoration': 'none',
    'word-break': 'break-all',
    'text-align': 'center',
    opacity: 0,
  },
  [`.liff-button-area[${uniq}] > button.liff-isDisp`]: {
    transition: 'opacity .4s ease-in',
    opacity: 1,
  },
  [`.liff-button-area[${uniq}] > .liff-button-submit`]: {
    color: '#ffffff',
    'background-color': '#00b900',
  },
  [`.liff-button-area[${uniq}] > button:disabled`]: {
    color: 'rgba(255,255,255, 0.5)',
    cursor: 'initial',
  },
  [`.liff-button-area[${uniq}] > button:last-of-type`]: {
    'margin-right': 0,
  },
  [`.liff-wrap_in[${uniq}].isOpening`]: {
    animation: `fadein-${uniq} 0.4s forwards ease-out`,
  },
  [`.liff-wrap_in[${uniq}].isClosing`]: {
    animation: `fadein-${uniq}reverse 0.4s forwards ease-in`,
  },
  [`.liff-iframe[${uniq}]`]: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
  [`@keyframes fadein-${uniq}`]: {
    from: {
      opacity: 0,
      transform: 'translateY(100vh)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  [`@keyframes fadein-${uniq}reverse`]: {
    from: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateY(100vh)',
    },
  },
})
