import { type UpdateEventDto, type CalendarEntity, type CreateEventDto } from '../'

export abstract class CalendarRepository {
  // abstract getEvents () {}
  abstract createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity>
  abstract updateEvent (updateEventDto: UpdateEventDto): Promise<CalendarEntity>
  // abstract deleteEvent () {}
}
