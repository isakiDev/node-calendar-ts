import { UserModel } from '../../data/mongo'
import {
  type RegisterUserDto,
  type AuthDatasource,
  type LoginUserDto,
  type UserEntity,
  CustomError,
  type RevalidateTokenDto
} from '../../domain'
import { UserMapper } from '../'
import { BcryptAdapter } from '../../config'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthDatasourceImpl implements AuthDatasource {
  constructor (
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto

    try {
      const user = await UserModel.findOne({ email })
      if (!user) throw CustomError.badRequest('User not exists')

      const isMatching = this.comparePassword(password, user.password)
      if (!isMatching) throw CustomError.badRequest('Invalid password')

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      const existsUser = await UserModel.findOne({ email })

      if (existsUser) throw CustomError.badRequest('User already exists')

      const user = await UserModel.create({
        email,
        name,
        password: this.hashPassword(password)
      })

      await user.save()

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }

  async revalidateToken (revalidateTokenDto: RevalidateTokenDto): Promise<UserEntity> {
    const { id, name } = revalidateTokenDto

    try {
      return UserMapper.userEntityFromObject({
        id,
        name
      })
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }

      throw CustomError.internalServer()
    }
  }
}
