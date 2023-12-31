export class LoginUserDto {
  constructor (
    public email: string,
    public password: string
  ) {}

  static create (object: Record<string, any>): [string?, LoginUserDto?] {
    const { email, password } = object

    if (!email || !email) return ['Missing email']
    if (!password) return ['Missing password']

    return [
      undefined,
      new LoginUserDto(email, password)
    ]
  }
}
