import { type Request, type Response, type NextFunction } from 'express'
import { CustomError, type RevalidateTokenDto } from '../../domain'
import { JwtAdapter } from '../../config'
import { validationResult } from 'express-validator'

interface Token {
  id: string
  name: string
  iat: number
  exp: number
}

type RequestWithIdAndName = Request & RevalidateTokenDto
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

  static validateData (req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.mapped()
      })
    }

    next()
  }
}
