interface InputUpdateEvent {
  id: string
  title: string
  notes: string
  start: Date
  end: Date
  user: string
}

export class UpdateEventDto {
  constructor (
    public id: string,
    public title: string,
    public notes: string,
    public start: Date,
    public end: Date,
    public user: string
  ) {}

  static create ({ id, end, notes, start, title, user }: InputUpdateEvent): [string?, UpdateEventDto?] {
    if (!id) return ['Missing id']
    if (!end) return ['Missing end date']
    if (!end) return ['Missing start date']
    if (!end) return ['Missing title']
    if (!end) return ['Missing user']

    return [
      undefined,
      new UpdateEventDto(id, title, notes, start, end, user)
    ]
  }
}
