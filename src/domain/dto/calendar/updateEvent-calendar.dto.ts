interface InputUpdateEvent {
  id: string
  title: string
  notes: string
  start: Date
  end: Date
  uid: string
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

  static create ({ id, end, notes, start, title, uid }: InputUpdateEvent): [string?, UpdateEventDto?] {
    if (!id) return ['Missing id']
    if (!end) return ['Missing end date']
    if (!start) return ['Missing start date']
    if (!title) return ['Missing title']
    if (!uid) return ['Missing user']

    return [
      undefined,
      new UpdateEventDto(id, title, notes, start, end, uid)
    ]
  }
}
