import {
  type AuthRepository,
  type LoginUserDto,
  type UserEntity,
  type AuthDatasource
} from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    return await this.authDatasource.login(loginUserDto)
  }
}
