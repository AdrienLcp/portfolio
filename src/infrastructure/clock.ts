/** The one module that reads the clock, so rendering never does. */
export const currentYear = (): number => new Date().getFullYear()

/** Today's calendar day in the given time zone. */
export const today = (timeZone: string): Temporal.PlainDate =>
  Temporal.Now.plainDateISO(timeZone)
