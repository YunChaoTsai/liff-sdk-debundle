/**
 * @author JP23555
 */
import { AbstractIframe } from './abstract/AbstractIframe'
import css from './css/shareTargetPicker'
import toStyle from '../toStyle'
import listen from './listen'
import { IframeEvent } from './windowPostMessage'
import qs from '../qs'
import removeListen from './removeListen'
import { ROUTER_MODE } from '../consts'

export class ShareTargetPickerIFrame extends AbstractIframe {
  protected routerMode
  protected submittedData: boolean | {} = false
  private wrapperIn: HTMLElement
  private originalBodyStyle: string = ''
  private orgDocumentStyle: string = ''
  private originalBodyPos: { x: number; y: number } = { x: 0, y: 0 }

  public async init(routerMode?: ROUTER_MODE): Promise<any> {
    if (routerMode !== ROUTER_MODE.HASH && routerMode !== ROUTER_MODE.HISTORY) {
      routerMode = ROUTER_MODE.NONE
    }
    this.routerMode = routerMode

    await super.init()

    await this.historyAdd()
    this.startWatchingHistoryChange()
  }

  protected prepareDom(): HTMLElement {
    const iframe = super.prepareDom()
    const wrapper = this.namespace.document.createElement('div')
    wrapper.setAttribute('class', 'liff-wrap')
    wrapper.setAttribute(this.uniqAttr, '')
    const wrapperIn = this.namespace.document.createElement('div')
    wrapperIn.setAttribute('class', 'liff-wrap_in isOpening')
    wrapperIn.setAttribute(this.uniqAttr, '')
    wrapperIn.appendChild(iframe)

    wrapper.appendChild(wrapperIn)
    this.wrapperIn = wrapperIn

    return wrapper
  }

  protected prepareStyle(): HTMLStyleElement {
    const style = super.prepareStyle()
    style.textContent = toStyle(css(this.uniqAttr))

    return style
  }

  public async cancel(): Promise<any> {
    this.resolve(null)
    await this.destroy()
  }

  public async submit(): Promise<any> {
    this.resolve(this.submittedData)
    await this.destroy()
  }

  public async destroy(): Promise<any> {
    this.revertBodyStyle()
    await new Promise(
      (resolve): void => {
        // check if the browser supports "transitionend"
        if ('onanimationend' in window) {
          // after closing animation, call finalize
          this.wrapperIn.classList.remove('isOpening')
          setTimeout((): void => {
            this.wrapperIn.classList.add('isClosing')
            listen(this.wrapperIn, 'animationend.iframe', null, {
              once: true,
            }).then(resolve)
          }, 0)
        } else {
          // if the browser doesn't support, call finalize immediately
          resolve()
        }
      }
    )
    await super.destroy()
  }

  protected changeBodyStyle(): void {
    // keep the current screen positions because body will be fixed position and will forget current positions soon
    this.originalBodyPos.x = window.scrollX
    this.originalBodyPos.y = window.scrollY

    this.originalBodyStyle = this.namespace.document.body.style.cssText
    this.orgDocumentStyle = this.namespace.document.documentElement.style.cssText
    this.namespace.document.body.style.cssText =
      this.originalBodyStyle +
      'overflow:hidden!important;height: 100%!important;'
    this.namespace.document.documentElement.style.cssText =
      'overflow:hidden!important;height: 100%!important;'

    // not to bounce screen at the edge of the page, listen scroll and force changing positions
    listen(
      this.namespace,
      'scroll.liff.iframe',
      function(event) {
        window.scrollTo(0, 0)
      },
      { passive: false }
    )
  }
  protected revertBodyStyle(): void {
    this.namespace.document.body.style.cssText = this.originalBodyStyle
    this.namespace.document.documentElement.style.cssText = this.orgDocumentStyle
    window.scrollTo(this.originalBodyPos.x, this.originalBodyPos.y)
    removeListen(this.namespace, 'scroll.liff.iframe')
  }

  private filter(obj): { [k: string]: any } {
    const result = {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] && key.length) {
        result[key] = obj[key]
      }
    }
    return result
  }

  public postMessageCallback = async (e: IframeEvent): Promise<void> => {
    await super.postMessageCallback(e)
    switch (e.data.name) {
      case 'cancel':
        if (this.routerMode === ROUTER_MODE.NONE) {
          await this.cancel()
        } else {
          this.namespace.history.back()
        }
        break
      case 'submit':
        const { data } = e
        if (data && data.body && data.body.token) {
          this.submittedData = data.body.token
        } else {
          throw new Error('submitted without data')
        }

        if (this.routerMode === ROUTER_MODE.NONE) {
          await this.submit()
        } else {
          this.namespace.history.back()
        }
        break
    }
  }

  /**
   * TODO こいつらの処遇は後で決める
   */

  protected historyAdd(): Promise<void> {
    if (this.routerMode === ROUTER_MODE.NONE) return Promise.resolve()

    switch (this.routerMode) {
      case ROUTER_MODE.HASH:
        const hash = qs.parse(this.namespace.location.hash)
        hash.userpicker = true
        this.namespace.location.hash = qs.stringify(hash)
        return new Promise(
          (resolve): void => {
            setTimeout(resolve, 0)
          }
        )
      case ROUTER_MODE.HISTORY:
        this.namespace.history.pushState(
          { userpicker: true },
          'liff userpicker',
          ''
        )
        return Promise.resolve()
    }
  }

  protected startWatchingHistoryChange(): void {
    const handler = async (): Promise<void> => {
      if (this.submittedData) {
        await this.submit()
      } else {
        await this.cancel()
      }
    }

    switch (this.routerMode) {
      case ROUTER_MODE.HASH:
        listen(this.namespace, 'hashchange.liff.iframe', handler, {
          once: true,
        })
        break
      case ROUTER_MODE.HISTORY:
        listen(this.namespace, 'popstate.liff.iframe', handler, { once: true })
        break
    }
  }

  protected historyRemove(): void {
    switch (this.routerMode) {
      case ROUTER_MODE.HASH:
        removeListen(this.namespace, 'hashchange.liff.iframe')

        const hash = qs.parse(window.location.hash)
        delete hash.userpicker
        window.location.hash = qs.stringify(this.filter(hash))
        break
      case ROUTER_MODE.HISTORY:
        removeListen(this.namespace, 'popstate.liff.iframe')
        window.history.replaceState(
          { userpicker: false },
          'liff userpicker',
          ''
        )
        break
    }
  }
}
