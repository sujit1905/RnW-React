export function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function formatDate(isoDate) {
  const d = new Date(isoDate)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(d)
}

export function isOverdue(dueIsoDate, now = new Date()) {
  const due = new Date(dueIsoDate)
  // Overdue if due date is in the past; due time is ignored by using date-only compare.
  return due.setHours(0, 0, 0, 0) < new Date(now).setHours(0, 0, 0, 0)
}

