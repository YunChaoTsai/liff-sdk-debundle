/**
 * @author JP23555
 */
import { AbstractSubwindow } from './AbstractSubwindow'

export abstract class AbstractPopup extends AbstractSubwindow {
  protected windowProxy: Window

  protected get postmessageDestination(): Window {
    return this.windowProxy
  }

  public async init(): Promise<any> {
    await super.init()
  }

  public async prepareWindow(): Promise<any> {
    this.windowProxy = window.open(
      this.url,
      'liffpopup',
      'width=480, height=640, menubar=no, toolbar=no, scrollbars=yes'
    )
  }

  public async breakWindow(): Promise<any> {
    this.windowProxy.close()
  }
}
