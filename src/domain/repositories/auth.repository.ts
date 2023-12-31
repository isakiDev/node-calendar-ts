import { type UserEntity } from '../entities'
import { type LoginUserDto } from '../dto'

export abstract class AuthRepository {
  abstract Login (loginUserDto: LoginUserDto): Promise<UserEntity>
  // abstract Register (registerUserDto: LoginUserDto): Promise<UserEntity>
}
