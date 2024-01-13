import { type Request, type Response } from 'express'
import { CreateEventDto, type CalendarRepository, CustomError, CreateEvent } from '../../domain'

interface RequestWithNameAndId extends Request {
  id?: string
  name?: string
}

export class CalendarController {
  constructor (
    private readonly calendarRepository: CalendarRepository
  ) {}

  private handleError (error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createEvent = async (req: RequestWithNameAndId, res: Response) => {
    const data = {
      ...req.body,
      user: req.body.user.id
    }

    const [error, createEventDto] = CreateEventDto.create(data)

    if (error) return res.status(400).json({ error })

    new CreateEvent(this.calendarRepository)
      .execute(createEventDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
