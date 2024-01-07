interface Fields {
  id: string
  name: string
}

export class RevalidateTokenDto implements Fields {
  constructor (
    public id: string,
    public name: string
  ) {}

  static create ({ id, name }: Fields): [string?, RevalidateTokenDto?] {
    if (!id) return ['Missing uid']
    if (!name) return ['Missing name']

    return [
      undefined,
      new RevalidateTokenDto(id, name)
    ]
  }
}
