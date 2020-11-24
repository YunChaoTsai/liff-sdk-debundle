/**
 * @author JP23555
 */
import { AbstractPopup } from './abstract/AbstractPopup'
import { IframeEvent } from './windowPostMessage'

// export interface ShareTargetPickerPopupInitOption {}

export class ShareTargetPickerPopup extends AbstractPopup {
  protected routerMode
  protected submittedData: boolean | {} = false

  public async init(): Promise<void> {
    await super.init()
  }

  public async cancel(): Promise<void> {
    this.resolve(null)
    await this.destroy()
  }

  public async submit(): Promise<void> {
    this.resolve(this.submittedData)
    await this.destroy()
  }

  public async destroy(): Promise<void> {
    await super.destroy()
  }

  public postMessageCallback = async (e: IframeEvent): Promise<void> => {
    await super.postMessageCallback(e)
    switch (e.data.name) {
      case 'cancel':
        await this.cancel()
        break
      case 'submit':
        const { data } = e
        if (data && data.body && data.body.token) {
          this.submittedData = data.body.token
        } else {
          throw new Error('submitted without data')
        }

        await this.submit()
        break
    }
  }
}
