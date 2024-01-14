import { CalendarEntity } from '../../domain'

export class CalendarMapper {
  static calendarEntityFromObject (object: Record<string, any>) {
    const { id, _id, start, end, notes = '', title, user } = object

    if (!_id || !id) {
      throw new Error('Missing id')
    }

    if (!title) throw new Error('Missing title')
    if (!start) throw new Error('Missing start date')
    if (!end) throw new Error('Missing end date')
    if (!user) throw new Error('Missing user')

    return new CalendarEntity(
      _id || id,
      title,
      notes,
      start,
      end,
      user
    )
  }
}
