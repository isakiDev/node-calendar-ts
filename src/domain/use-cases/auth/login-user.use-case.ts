import { CustomError, type AuthRepository, type LoginUserDto } from '../..'
import { JwtAdapter } from '../../../config'

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

    const token = await JwtAdapter.generateToken({ id })
    if (!token) throw CustomError.internalServer('Error generating token')

    return {
      token,
      user: {
        id,
        name,
        email
      }
    }
  }
}
