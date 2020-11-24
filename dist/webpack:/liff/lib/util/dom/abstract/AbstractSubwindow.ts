/**
 * @author JP23555
 */
import { WindowPostMessage, IframeEvent } from '../windowPostMessage'

export abstract class AbstractSubwindow {
  protected url: string = ''
  protected uniqAttr: string = ''
  protected namespace: Window
  protected accessToken: string
  protected windowPostMessage: WindowPostMessage
  protected contentElm: HTMLElement
  protected styleElm: HTMLStyleElement
  protected resolve: Function
  protected reject: Function
  protected pingHandler
  protected healthcheckHandler

  protected abstract postmessageDestination: Window

  public constructor(
    url: string,
    accessToken: string,
    namespace: Window = window
  ) {
    this.url = url
    this.accessToken = accessToken
    this.namespace = namespace
    this.windowPostMessage = new WindowPostMessage()
  }

  // parepare callbacks
  public async init(): Promise<any> {
    await this.prepareWindow()

    this.windowPostMessage.init(
      this.namespace,
      this.postmessageDestination,
      this.postMessageCallback
    )

    this.pingHandler = setInterval((): void => {
      console.log('windowPostMessage ping')
      this.windowPostMessage.send('ping')
    }, 1000)
    this.healthcheckHandler = setInterval((): void => {
      if (this.postmessageDestination.closed) {
        if (this.resolve) {
          this.resolve(null)
        }
      }
    }, 1000)
  }

  public async start(): Promise<any> {
    return new Promise(
      (resolve, reject): void => {
        this.resolve = resolve
        this.reject = reject
      }
    )
  }

  public async destroy(): Promise<any> {
    clearInterval(this.pingHandler)
    clearInterval(this.healthcheckHandler)
    this.breakWindow()
    this.windowPostMessage.destroy()
  }

  // make HTMLElements
  protected abstract prepareWindow(): Promise<any>
  protected abstract breakWindow(): Promise<any>
  public async postMessageCallback(e: IframeEvent): Promise<any> {
    switch (e.data.name) {
      case 'ping':
        clearInterval(this.pingHandler)
        this.windowPostMessage.send('pong', {
          accessToken: this.accessToken,
        })
        break
      case 'exception':
        this.destroy()
        this.reject(e.data.body)
        break
    }
  }
}
