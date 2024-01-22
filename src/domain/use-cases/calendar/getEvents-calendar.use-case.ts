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

interface GetEventsUseCase {
  execute: () => Promise<Calendar[]>
}

export class GetEvents implements GetEventsUseCase {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  async execute (): Promise<Calendar[]> {
    return await this.calendarRepository.getEvents()
  }
}
