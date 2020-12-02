import { PluginName } from './config'

export default function loadPlugin(plugin: PluginName): Promise<any> {
  switch (plugin) {
    case 'bluetooth':
      return import(
        /* webpackChunkName: "bluetooth" */
        `../../plugins/bluetooth/index.js`
      )
    case 'advertisement':
      return import(
        /* webpackChunkName: "advertisement" */
        `../../plugins/advertisement/index.js`
      )
    default:
      return Promise.reject()
  }
}
