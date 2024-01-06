export class TokenUserDto {
  constructor (
    public token: string
  ) {}

  static create (token: string): [string?, TokenUserDto?] {
    if (!token) return ['Missing token']
    // awd
    return [
      undefined,
      new TokenUserDto(token)
    ]
  }
}
