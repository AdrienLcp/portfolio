export const isReminderOwed = ({
  lastSessionDay, lastShownDay, now, schedule, today
}) =>
  schedule.isEnabled &&
  schedule.days.some((day) => day === now.getDay()) &&
  now.getTime() >= reminderOn(now, schedule.time).getTime() &&
  lastShownDay !== today &&
  lastSessionDay !== today
