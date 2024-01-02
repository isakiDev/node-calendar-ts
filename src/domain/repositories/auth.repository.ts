import { type LoginUserDto } from '../dto/auth'
import { type UserEntity } from '../'

export abstract class AuthRepository {
  abstract login (loginUserDto: LoginUserDto): Promise<UserEntity>
  // abstract Register (registerUserDto: LoginUserDto): Promise<UserEntity>
}
