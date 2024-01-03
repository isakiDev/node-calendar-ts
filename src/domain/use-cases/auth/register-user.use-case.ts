import { type AuthRepository, type RegisterUserDto } from '../..'
import { JwtAdapter } from '../../../config'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

interface RegisterUserUseCase {
  execute: (registerUserDto: RegisterUserDto) => Promise<UserToken>
}

export class RegisterUser implements RegisterUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  async execute (registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto)

    const token = await JwtAdapter.generateToken({
      name: user?.name
    })

    if (!token) throw new Error('Token not generated')

    return {
      token,
      user: {
        id: user?.id,
        email: user?.email,
        name: user?.name
      }
    }
  }
}
