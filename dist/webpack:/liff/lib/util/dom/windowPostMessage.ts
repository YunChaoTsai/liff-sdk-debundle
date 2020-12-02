/**
 * @author JP23555
 */
import listen from './listen'
import removeListen from './removeListen'
import getEndPoint from '../getEndPoint'

export interface IframeEvent extends MessageEvent {
  data: { name: string; body: any }
}

export class WindowPostMessage {
  public receiver: Window
  public destination: Window
  public listenKeyName = 'message.liff'

  public init(
    receiver: Window,
    destination: Window,
    callback: (e: IframeEvent) => Promise<void>
  ): void {
    this.receiver = receiver
    this.destination = destination

    // in case, remove event
    this.destroy()
    listen(
      this.receiver,
      this.listenKeyName,
      async (e: IframeEvent): Promise<void> => {
        if (e && e.data && e.data.name) {
          console.log('RECEIVE>>>', e.data.name)
          await callback(e)
        }
      }
    )
  }

  public send(name: string, body: {} = {}): void {
    const SERVER_END_POINT = getEndPoint('userPickerDomain')
    const sendData: IframeEvent['data'] = {
      name,
      body,
    }
    this.destination.postMessage(sendData, SERVER_END_POINT)
  }

  public destroy(): void {
    removeListen(this.receiver, this.listenKeyName)
  }
}
