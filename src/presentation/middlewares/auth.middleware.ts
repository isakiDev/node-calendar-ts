import { type Request, type Response, type NextFunction } from 'express'
import { CustomError } from '../../domain'
import { JwtAdapter } from '../../config'

interface Token {
  id: string
  name: string
  iat: number
  exp: number
}

type TokenVerify = Token | null
type RequestWithIdAndName = Request & { id: string, name: string }

export class AuthMiddleware {
  static async validateJWT (req: RequestWithIdAndName, res: Response, next: NextFunction) {
    const tokenHeader = req.header('x-token')

    if (!tokenHeader) throw CustomError.badRequest('Missing token')

    try {
      const data: TokenVerify = await JwtAdapter.validateToken(tokenHeader)

      if (!data) {
        return res.status(401).json({
          error: 'Invalid token'
        })
      }

      req.id = data.id
      req.name = data.name

      next()
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error'
      })
    }
  }
}
