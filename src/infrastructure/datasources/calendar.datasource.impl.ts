import { EventModel } from '../../data/mongo'
import { type CalendarEntity, type CreateEventDto, type CalendarDatasourse, CustomError, type UpdateEventDto, type DeleteEventDto } from '../../domain'
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

  async updateEvent (updateEventDto: UpdateEventDto): Promise<CalendarEntity> {
    const { id, user } = updateEventDto

    try {
      const event = await EventModel.findById(id)

      if (!event) throw CustomError.badRequest('Event not exists')

      if (event.user.toString() !== user) throw CustomError.unauthorized('You do not have privileges to update')

      const newEvent = { ...updateEventDto }

      const eventUpdated = await EventModel.findByIdAndUpdate(id, newEvent, { new: true })

      if (!eventUpdated) throw CustomError.internalServer()

      return CalendarMapper.calendarEntityFromObject(eventUpdated)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  async deleteEvent (deleteEventDto: DeleteEventDto): Promise<CalendarEntity> {
    const { id, uid } = deleteEventDto

    try {
      const event = await EventModel.findById(id)

      if (!event) throw CustomError.notFound(`Event with id ${id} not found`)
      if (event?.user.toString() !== uid) throw CustomError.unauthorized('You do not have privileges to delete')

      const eventDeleted = await EventModel.findByIdAndDelete(id)

      return CalendarMapper.calendarEntityFromObject(eventDeleted)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
