import {
  type AuthDatasource,
  type LoginUserDto,
  type UserEntity
} from '../../domain'

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
}
