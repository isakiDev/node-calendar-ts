import { Router } from 'express'
import { CalendarController } from './controller'
import { CalendarDatasourceImpl, CalendarRepositoryImpl } from '../../infrastructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class CalendarRoutes {
  static get routes () {
    const router = Router()

    const datasource = new CalendarDatasourceImpl()
    const repository = new CalendarRepositoryImpl(datasource)
    const controller = new CalendarController(repository)

    router.post('/', AuthMiddleware.validateJWT, controller.createEvent)

    return router
  }
}
