import { type User } from '../../../types'

export class RegisterUserDto implements User {
  constructor (
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create (object: User): [string?, RegisterUserDto?] {
    const { name, email, password } = object

    if (!name) return ['Missing name']
    if (!email) return ['Missing email']
    if (!password) return ['Missing password']

    return [
      undefined,
      new RegisterUserDto(name, email, password)
    ]
  }
}
