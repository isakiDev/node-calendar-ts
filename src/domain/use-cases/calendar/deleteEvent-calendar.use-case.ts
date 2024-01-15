import { type DeleteEventDto } from '../../dto/calendar'
import { type CalendarEntity } from '../../entities/calendar.entity'
import { type CalendarRepository } from '../../repositories/calendar.repository'

interface DeleteEventUseCase {
  execute: (deleteEvent: DeleteEventDto) => Promise<CalendarEntity>
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (deleteEvent: DeleteEventDto): Promise<CalendarEntity> {
    return await this.calendarRepository.deleteEvent(deleteEvent)
  }
}
