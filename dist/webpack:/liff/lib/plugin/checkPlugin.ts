import checkFeature from '../client/checkFeature'
import { verification } from './config'

/**
 * check whether plugin is supported
 * @export
 * @param {string} plugin
 * @returns {boolean}
 */
export default function checkPlugin(plugin: string): boolean {
  const pluginVerification = verification[plugin]
  if (!pluginVerification) {
    return false
  }
  if (pluginVerification.shouldIgnore) {
    return true
  }
  return checkFeature(pluginVerification.featureName)
}
