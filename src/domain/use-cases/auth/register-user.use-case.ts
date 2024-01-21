import { CustomError, type AuthRepository, type RegisterUserDto } from '../..'
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

type SignToken = (payload: Record<string, unknown>, duration?: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute (registerUserDto: RegisterUserDto): Promise<UserToken> {
    const { id, name, email } = await this.authRepository.register(registerUserDto)

    const token = await this.signToken({ uid: id, name }, '1h')

    if (!token) throw CustomError.badRequest('Token not generated')

    return {
      token,
      user: {
        id,
        email,
        name
      }
    }
  }
}
