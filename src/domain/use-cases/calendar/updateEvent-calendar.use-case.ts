import { type UpdateEventDto } from '../../dto/calendar'
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

interface UpdateEventUseCase {
  execute: (updateEvent: UpdateEventDto) => Promise<Calendar>
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (updateEvent: UpdateEventDto): Promise<Calendar> {
    const event = await this.calendarRepository.updateEvent(updateEvent)

    if (!event) throw CustomError.badRequest('Event not updated')

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
