import {
  type AuthRepository,
  type LoginUserDto,
  type UserEntity,
  type AuthDatasource,
  type RegisterUserDto,
  type RevalidateTokenDto
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    return await this.authDatasource.login(loginUserDto)
  }

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDto)
  }

  async revalidateToken (revalidateTokenDto: RevalidateTokenDto): Promise<UserEntity> {
    return await this.authDatasource.revalidateToken(revalidateTokenDto)
  }
}
