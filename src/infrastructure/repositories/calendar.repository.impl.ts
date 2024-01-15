import {
  type CalendarEntity,
  type CreateEventDto,
  type CalendarDatasourse,
  type CalendarRepository,
  type UpdateEventDto,
  type DeleteEventDto
} from '../../domain'

export class CalendarRepositoryImpl implements CalendarRepository {
  constructor (
    private readonly calendarDatasource: CalendarDatasourse
  ) {}

  async createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity> {
    return await this.calendarDatasource.createEvent(createEventDto)
  }

  async updateEvent (updateEventDto: UpdateEventDto): Promise<CalendarEntity> {
    return await this.calendarDatasource.updateEvent(updateEventDto)
  }

  async deleteEvent (deleteEventDto: DeleteEventDto): Promise<CalendarEntity> {
    return await this.calendarDatasource.deleteEvent(deleteEventDto)
  }
}
