interface InputCreateEvent {
  title: string
  notes: string
  start: Date
  end: Date
  user: string
}

export class CreateEventDto {
  constructor (
    public title: string,
    public start: Date,
    public end: Date,
    public user: string,
    public notes?: string
  ) {}

  static create ({ title, end, notes = '', start, user }: InputCreateEvent): [string?, CreateEventDto?] {
    if (!title) return ['Missing title']
    if (!start) return ['Missing start date']
    if (!notes) return ['Missing notes']
    if (!end) return ['Missing end date']
    if (!user) return ['Missing user']

    return [
      undefined,
      new CreateEventDto(title, start, end, user, notes)
    ]
  }
}
