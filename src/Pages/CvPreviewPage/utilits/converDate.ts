export function converDate(start_date: string, end_date: string) {
  const start = `${start_date.split('-')[1]}.${start_date.split('-')[0]}`
  if (!end_date) {
    return start
  }
  return `${start} - ${end_date.split('-')[1]}.${end_date.split('-')[0]}`
}
