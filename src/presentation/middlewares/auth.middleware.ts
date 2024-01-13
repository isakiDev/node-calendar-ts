import { type Request, type Response, type NextFunction } from 'express'
import { CustomError } from '../../domain'
import { JwtAdapter } from '../../config'
import { validationResult } from 'express-validator'

interface Token {
  id: string
  name: string
  iat: number
  exp: number
}

type TokenVerify = Token | null

export class AuthMiddleware {
  static async validateJWT (req: Request, res: Response, next: NextFunction) {
    const tokenHeader = req.header('Authorization')

    try {
      if (!tokenHeader) throw CustomError.unauthorized('Missing token')
      if (!tokenHeader.startsWith('Bearer')) throw CustomError.unauthorized('Invalid bearer token')

      const token = tokenHeader.split(' ').at(1) ?? ''
      const data: TokenVerify = await JwtAdapter.validateToken(token)

      if (!data) {
        return res.status(401).json({
          error: 'Invalid token'
        })
      }

      req.body.user = {
        id: data.id,
        name: data.name
      }

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
