// type checking
export type PluginName = 'bluetooth' | 'advertisement'

export type PluginNames = PluginName[]

/**
 * a config for plugin verification
 * - if `[plugin].featureName` exists, check whether features is avaiable by LINE client.
 * - if `[plugin].shoudIgnore` is ture, don't verify plugin, use directly.
 */
export const verification = {
  bluetooth: {
    featureName: 'bluetoothLeFunction',
    shouldIgnore: false,
  },
  advertisement: {
    shouldIgnore: true,
  },
}
