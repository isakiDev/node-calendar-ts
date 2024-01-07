import { type RegisterUserDto, type LoginUserDto, type RevalidateTokenDto } from '../dto/auth'
import { type UserEntity } from '../'

export abstract class AuthDatasource {
  abstract login (loginUserDto: LoginUserDto): Promise<UserEntity>
  abstract register (registerUserDto: RegisterUserDto): Promise<UserEntity>
  abstract revalidateToken (revalidateTokenDto: RevalidateTokenDto): Promise<UserEntity>
}
