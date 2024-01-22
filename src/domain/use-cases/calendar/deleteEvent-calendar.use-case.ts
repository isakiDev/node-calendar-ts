import { type DeleteEventDto } from '../../dto/calendar'
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

interface DeleteEventUseCase {
  execute: (deleteEvent: DeleteEventDto) => Promise<Calendar>
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (deleteEvent: DeleteEventDto): Promise<Calendar> {
    const { user, ...rest } = await this.calendarRepository.deleteEvent(deleteEvent)

    return {
      ...rest,
      user: {
        id: user.id
      }
    }
  }
}
