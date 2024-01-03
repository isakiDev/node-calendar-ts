import { UserModel } from '../../data/mongo'
import {
  type RegisterUserDto,
  type AuthDatasource,
  type LoginUserDto,
  type UserEntity
} from '../../domain'
import { UserMapper } from '../mappers/user.mapper'

export class AuthDatasourceImpl implements AuthDatasource {
  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    // throw new Error('Method not implemented.')
    return {
      id: '1',
      name: 'Gaspar',
      email: 'test@email.com',
      password: 'qqqqqq'
    }
  }

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto
    try {
      const existsUser = await UserModel.findOne({ email })

      if (existsUser) throw new Error('User already exists')

      const user = await UserModel.create({
        email: registerUserDto.email,
        name: registerUserDto.name,
        password: registerUserDto.password
      })

      await user.save()

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
