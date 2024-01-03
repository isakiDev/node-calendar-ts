import { UserEntity } from '../../domain'

export class UserMapper {
  static userEntityFromObject (object: Record<string, any>) {
    const { id, _id, name, email, password } = object

    if (!_id || !id) {
      throw new Error('Missing id')
    }

    if (!name) throw new Error('Missing name')
    if (!email) throw new Error('Missing email')
    if (!password) throw new Error('Missing password')

    return new UserEntity(
      _id || id,
      name,
      email,
      password
    )
  }
}
