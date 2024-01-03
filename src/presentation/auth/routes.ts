import { Router } from 'express'

import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure'
import { AuthController } from './controller'

export class AuthRoutes {
  static get routes () {
    const router = Router()

    const datasource = new AuthDatasourceImpl()
    const repository = new AuthRepositoryImpl(datasource)
    const controller = new AuthController(repository)

    router.post('/register', controller.register)
    router.post('/login', controller.login)

    return router
  }
}
