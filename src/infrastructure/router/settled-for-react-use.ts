/**
 * `use` suspends on a promise it has never seen, even one already resolved.
 * Tagged the way React tracks a settled promise, its value reads at once.
 */
export const markAsSettledForReactUse = (
  promise: Promise<unknown>
): Promise<unknown> =>
  promise.then(
    (value) => Object.assign(promise, { status: 'fulfilled', value }),
    () => undefined
  )
