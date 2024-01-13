export const isDate = (value: string) => {
  if (!value) return false

  const date = new Date(value)

  if (!isNaN(date.getTime())) return true

  return false
}
