import { type CalendarEntity, type CreateEventDto } from '../'

export abstract class CalendarDatasourse {
  // abstract getEvents () {}
  abstract createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity>
  // abstract updateEvent () {}
  // abstract deleteEvent () {}
}
