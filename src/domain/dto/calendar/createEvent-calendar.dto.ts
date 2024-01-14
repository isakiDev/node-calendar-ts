interface InputCreateEvent {
  end: Date
  notes: string
  start: Date
  title: string
  user: string
}

export class CreateEventDto {
  constructor (
    public end: Date,
    public notes: string,
    public start: Date,
    public title: string,
    public user: string
  ) {}

  static create ({ title, end, notes = '', start, user }: InputCreateEvent): [string?, CreateEventDto?] {
    if (!title) return ['Missing title']
    if (!start) return ['Missing start date']
    if (!end) return ['Missing end date']
    if (!user) return ['Missing user']

    return [
      undefined,
      new CreateEventDto(end, notes, start, title, user)
    ]
  }
}
