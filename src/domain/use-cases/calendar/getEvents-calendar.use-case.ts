import { type CalendarEntity } from '../../entities/calendar.entity'
import { type CalendarRepository } from '../../repositories/calendar.repository'

interface GetEventsUseCase {
  execute: () => Promise<CalendarEntity[]>
}

export class GetEvents implements GetEventsUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (): Promise<CalendarEntity[]> {
    return await this.calendarRepository.getEvents()
  }
}
