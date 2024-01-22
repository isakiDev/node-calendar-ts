import { type CreateEventDto } from '../../dto/calendar'
import { CustomError } from '../../errors/custom.error'
import { type CalendarRepository } from '../../repositories/calendar.repository'

interface Calendar {
  id: string
  title: string
  notes: string
  start: Date
  end: Date
  user: {
    id: string
  }
}

interface CreateEventUseCase {
  execute: (createEventDto: CreateEventDto) => Promise<Calendar>
}

export class CreateEvent implements CreateEventUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (createEventDto: CreateEventDto): Promise<Calendar> {
    const event = await this.calendarRepository.createEvent(createEventDto)

    if (!event) throw CustomError.badRequest('Event not created')

    return {
      id: event.id,
      title: event.title,
      start: event.start,
      notes: event.notes,
      end: event.end,
      user: {
        id: event.user
      }
    }
  }
}
