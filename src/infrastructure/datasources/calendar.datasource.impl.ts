import { EventModel } from '../../data/mongo'
import { type CalendarEntity, type CreateEventDto, type CalendarDatasourse, CustomError } from '../../domain'
import { CalendarMapper } from '../mappers/calendar.mapper'

export class CalendarDatasourceImpl implements CalendarDatasourse {
  async createEvent (createEventDto: CreateEventDto): Promise<CalendarEntity> {
    try {
      const event = await EventModel.create(createEventDto)

      await event.save()

      return CalendarMapper.calendarEntityFromObject(event)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
