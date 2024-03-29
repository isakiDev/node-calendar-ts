import { type UpdateEventDto, type CalendarEntity, type CreateEventDto, type DeleteEventDto } from '../'

export abstract class CalendarRepository {
  abstract getEvents (): Promise<CalendarEntity[]>
  abstract createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity>
  abstract updateEvent (updateEventDto: UpdateEventDto): Promise<CalendarEntity>
  abstract deleteEvent (deleteEventDto: DeleteEventDto): Promise<CalendarEntity>
}
