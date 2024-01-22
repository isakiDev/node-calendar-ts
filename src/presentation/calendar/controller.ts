import { type Request, type Response } from 'express'
import { CreateEventDto, type CalendarRepository, CustomError, CreateEvent, UpdateEventDto, UpdateEvent, DeleteEventDto, DeleteEvent, GetEvents } from '../../domain'

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
      user: req.body.user.uid
    }

    const [error, createEventDto] = CreateEventDto.create(data)

    if (error) return res.status(400).json({ error })

    new CreateEvent(this.calendarRepository)
      .execute(createEventDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  updateEvent = async (req: RequestWithNameAndId, res: Response) => {
    const { id } = req.params

    const data = {
      ...req.body,
      id,
      user: req.body.user.uid
    }

    const [error, updateEventDto] = UpdateEventDto.create(data)

    if (error) return res.status(400).json({ error })

    new UpdateEvent(this.calendarRepository)
      .execute(updateEventDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  deleteEvent = async (req: RequestWithNameAndId, res: Response) => {
    const { id } = req.params
    const { uid } = req.body.user

    const [error, deleteEventDto] = DeleteEventDto.create({ id, uid })

    if (error) return res.status(400).json({ error })

    new DeleteEvent(this.calendarRepository)
      .execute(deleteEventDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getEvents = async (req: Request, res: Response) => {
    new GetEvents(this.calendarRepository)
      .execute()
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
