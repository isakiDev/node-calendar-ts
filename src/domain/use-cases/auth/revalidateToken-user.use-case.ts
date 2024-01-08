import { JwtAdapter } from '../../../config'
import { type RevalidateTokenDto } from '../../dto/auth'
import { CustomError } from '../../errors/custom.error'
import { type AuthRepository } from '../../repositories/auth.repository'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
  }
}

interface RevalidateTokenUserUseCase {
  execute: (revalidateTokenDto: RevalidateTokenDto) => Promise<UserToken>
}

type SignToken = (payload: Record<string, unknown>, duration?: string) => Promise<string | null>

export class RevalidateToken implements RevalidateTokenUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken

  ) {}

  async execute (revalidateTokenDto: RevalidateTokenDto): Promise<UserToken> {
    const { id, name } = await this.authRepository.revalidateToken(revalidateTokenDto)

    const token = await this.signToken({ id, name })

    if (!token) throw CustomError.badRequest('Token not generated')

    return {
      token,
      user: {
        id,
        name
      }
    }
  }
}
