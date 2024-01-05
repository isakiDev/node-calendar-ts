interface Fields {
  email: string
  password: string
}

export class LoginUserDto {
  constructor (
    public email: string,
    public password: string
  ) {}

  // static create (object: Record<string, unknown>): [string?, LoginUserDto?] {
  static create (object: Fields): [string?, LoginUserDto?] {
    const { email, password } = object

    if (!email || !email) return ['Missing email']
    if (!password) return ['Missing password']

    return [
      undefined,
      new LoginUserDto(email, password)
    ]
  }
}
