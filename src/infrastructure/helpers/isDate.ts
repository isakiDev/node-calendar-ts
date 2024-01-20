import { DateTime } from 'luxon'

export const isDate = (value: string) => {
  if (!value) return false

  if (DateTime.fromISO(value).isValid) return true

  return false
}
