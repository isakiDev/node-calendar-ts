import { type CreateEventDto } from '../../dto/calendar'
import { CustomError } from '../../errors/custom.error'
import { type CalendarRepository } from '../../repositories/calendar.repository'

interface Calendar {
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
      title: event.title,
      end: event.end,
      notes: event.notes,
      start: event.start,
      user: {
        id: event.user
      }
    }
  }
}
