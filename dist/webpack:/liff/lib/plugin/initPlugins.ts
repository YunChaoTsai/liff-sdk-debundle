import { PluginName, PluginNames } from './config'
import checkPlugin from './checkPlugin'
import loadPlugin from './loadPlugin'
import createError from '../util/createError'
import { FORBIDDEN } from '../util/consts'

/**
 * Verify and load and initialize plugins.
 * @param   {PluginNames}  plugins - string array of plugin names
 * @returns {Promise<any>}
 */
export default function initPlugins(plugins: PluginNames): Promise<any> {
  window._log('[load plugins]', plugins)
  return Promise.all(
    plugins.map(
      async (plugin: PluginName): Promise<any> => {
        if (!checkPlugin(plugin)) {
          let msg: string = `Plugin ${plugin} is no supported.`
          if (plugin === 'bluetooth') {
            msg += ` And bluetooth only works in LINE client. Also you need enable "BLE feature" in Developer Center.`
          }
          throw createError(FORBIDDEN, msg)
        }
        const module: any = await loadPlugin(plugin)
        if (module && typeof module.default === 'function') {
          this[plugin] = await module.default()
        }
      }
    )
  )
}
