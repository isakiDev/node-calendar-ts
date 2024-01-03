import { type AuthRepository, type LoginUserDto } from '../..'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface LoginUserUseCase {
  execute: (loginUserDto: LoginUserDto) => Promise<UserToken>
}

export class LoginUser implements LoginUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  async execute (loginUserDto: LoginUserDto): Promise<UserToken> {
    const { id, name, email } = await this.authRepository.login(loginUserDto)

    return {
      token: 'test-token',
      user: {
        id,
        name,
        email
      }
    }
  }
}
