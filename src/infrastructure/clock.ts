/** The one module that reads the clock, so rendering never does. */
export const currentYear = (): number => new Date().getFullYear()
