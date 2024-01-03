import jwt from 'jsonwebtoken'
import { envs } from '.'

const JWT_SEED = envs.JWT_SEED

export class JwtAdapter {
  static async generateToken (payload: Object, duration = '2h'): Promise<string | null> {
    return await new Promise(resolve => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) { resolve(null); return }
        resolve(token as string)
      })
    })
  }

  static async validateToken<T> (token: string): Promise<T | null> {
    return await new Promise(resolve => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) { resolve(null); return }

        resolve(decoded as T)
      })
    })
  }
}
