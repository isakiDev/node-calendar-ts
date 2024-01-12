import { type CalendarEntity, type CreateEventDto } from '../'

export abstract class CalendarRepository {
  // abstract getEvents () {}
  abstract createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity>
  // abstract updateEvent () {}
  // abstract deleteEvent () {}
}
