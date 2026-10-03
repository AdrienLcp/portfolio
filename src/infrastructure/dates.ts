/** The first instant of a `YYYY-MM` month in UTC, as the `Date` that `Intl.DateTimeFormat` formats. */
export const monthToDate = (month: string): Date =>
  new Date(`${month}-01T00:00:00Z`)
