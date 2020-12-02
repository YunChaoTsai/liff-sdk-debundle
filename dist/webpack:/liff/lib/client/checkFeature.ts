import { getFeatures } from '../store'

/**
 * checkFeature()
 * Check whether the promission of the feature is approved
 * @param  {string}  feature [name of feature]
 * @return {boolean}
 */
export default function checkFeature(feature: string): boolean {
  return getFeatures().indexOf(feature) > -1
}
