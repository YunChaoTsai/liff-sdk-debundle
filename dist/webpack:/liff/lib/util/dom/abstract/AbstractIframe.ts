/**
 * @author JP23555
 */
import { AbstractSubwindow } from './AbstractSubwindow'
import makeUniqAttr from '../makeUniqAttr'

export abstract class AbstractIframe extends AbstractSubwindow {
  protected iframe: HTMLIFrameElement

  protected get postmessageDestination(): Window {
    return this.iframe.contentWindow
  }

  public async init(): Promise<any> {
    await super.init()
  }

  protected async prepareWindow(): Promise<any> {
    this.uniqAttr = makeUniqAttr()
    this.contentElm = this.prepareDom()
    this.styleElm = this.prepareStyle()

    this.changeBodyStyle()
    this.namespace.document.body.appendChild(this.contentElm)
    this.namespace.document.head.appendChild(this.styleElm)
  }

  protected async breakWindow(): Promise<any> {
    this.namespace.document.body.removeChild(this.contentElm)
    this.namespace.document.head.removeChild(this.styleElm)
  }

  protected prepareDom(): HTMLElement {
    const iframe = this.namespace.document.createElement('iframe')

    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin')
    iframe.setAttribute('name', `LIFF-iframe-${this.uniqAttr}`)
    iframe.setAttribute('src', this.url)
    iframe.setAttribute('class', 'liff-iframe')
    iframe.setAttribute(this.uniqAttr, '')

    this.iframe = iframe

    return iframe
  }

  protected prepareStyle(): HTMLStyleElement {
    return this.namespace.document.createElement('style')
  }

  protected abstract changeBodyStyle(): void
  protected abstract revertBodyStyle(): void
}
