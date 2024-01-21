import { type UserTokenData } from '../../../types'

export class RevalidateTokenDto implements UserTokenData {
  constructor (
    public uid: string,
    public name: string
  ) {}

  static create ({ uid, name }: UserTokenData): [string?, RevalidateTokenDto?] {
    if (!uid) return ['Missing uid']
    if (!name) return ['Missing name']

    return [
      undefined,
      new RevalidateTokenDto(uid, name)
    ]
  }
}
