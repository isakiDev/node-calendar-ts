import { Router } from 'express'

import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure'
import { AuthController } from './controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ValidatorAdapter } from '../../config'

export class AuthRoutes {
  static get routes () {
    const router = Router()

    const datasource = new AuthDatasourceImpl()
    const repository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(repository)

    router.post('/register',
      [
        ValidatorAdapter.check('name').notEmpty().withMessage('Name is required'),
        ValidatorAdapter.check('email').isEmail().withMessage('Email is required'),
        ValidatorAdapter.check('password').notEmpty().isLength({ min: 6 })
          .withMessage('Password must be minimum 6 characters')
          .matches(/^[^\s]+$/).withMessage('Password cannot contain spaces'),
        AuthMiddleware.validateData
      ],
      controller.register
    )

    router.post('/login',
      [
        ValidatorAdapter.check('email').isEmail().withMessage('Email is required'),
        ValidatorAdapter.check('password').isLength({ min: 6 }).withMessage('Password must be minimum 6 characters'),
        AuthMiddleware.validateData
      ],
      controller.login
    )

    router.get('/rev', AuthMiddleware.validateJWT, controller.revalidateToken)

    return router
  }
}
