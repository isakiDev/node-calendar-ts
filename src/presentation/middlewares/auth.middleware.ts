import { type Request, type Response, type NextFunction } from 'express'
import { CustomError } from '../../domain'
import { JwtAdapter } from '../../config'

interface Token {
  id: string
  name: string
  iat: number
  exp: number
}

interface RequestWithIdAndName extends Request {
  id?: string
  name?: string
}

type TokenVerify = Token | null

export class AuthMiddleware {
  static async validateJWT (req: RequestWithIdAndName, res: Response, next: NextFunction) {
    const tokenHeader = req.header('x-token')

    try {
      if (!tokenHeader) throw CustomError.unauthorized('Missing token')

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
      if (error instanceof CustomError) {
        res.status(error.statusCode).json({ error: error.message })
      }

      CustomError.internalServer()
    }
  }
}
