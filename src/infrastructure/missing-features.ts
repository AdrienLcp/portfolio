/**
 * Fills in what the site calls and its oldest supported browsers lack, each
 * polyfill a chunk of its own that a browser holding the feature never
 * downloads. Awaited before anything renders: the clock and the date
 * formatting use Temporal unconditionally. The list is what the built bundle
 * calls, not a guess: an API newer than the build target goes in it.
 */
export const installMissingFeatures = async (): Promise<void> => {
  await Promise.all([
    /** Safari, Chromium before 144. */
    'Temporal' in globalThis || import('temporal-polyfill/global'),
    /** Chromium before 92, Safari before 15.4. */
    'at' in Array.prototype || import('core-js/actual/array/at')
  ])
}
