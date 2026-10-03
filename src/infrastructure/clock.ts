/**
 * The one module that reads the clock, so rendering never does. It reads
 * `Date.now()` because fake timers steer `Date`, never `Temporal.Now`.
 */
const nowIn = (timeZone: string): Temporal.ZonedDateTime =>
  Temporal.Instant.fromEpochMilliseconds(Date.now()).toZonedDateTimeISO(
    timeZone
  )

/** The current year in the visitor's own time zone. */
export const currentYear = (): number => nowIn(Temporal.Now.timeZoneId()).year

/** Today's calendar day in the given time zone. */
export const today = (timeZone: string): Temporal.PlainDate =>
  nowIn(timeZone).toPlainDate()
