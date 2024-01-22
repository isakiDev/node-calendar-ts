interface InputDeleteEvent {
  id: string
  uid: string
}

export class DeleteEventDto {
  constructor (
    public readonly id: string,
    public readonly user: string

  ) {}

  static create ({ id, uid }: InputDeleteEvent): [string?, DeleteEventDto?] {
    if (!id) return ['Missing id']
    if (!uid) return ['Missing user']

    return [
      undefined,
      new DeleteEventDto(id, uid)
    ]
  }
}
