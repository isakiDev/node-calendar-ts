interface FieldsDeleteEvent {
  id: string
  uid: string
}

export class DeleteEventDto {
  constructor (
    public readonly id: string,
    public readonly uid: string

  ) {}

  static create ({ id, uid }: FieldsDeleteEvent): [string?, DeleteEventDto?] {
    if (!id) return ['Missing id']
    if (!uid) return ['Missing user id']

    return [
      undefined,
      new DeleteEventDto(id, uid)
    ]
  }
}
