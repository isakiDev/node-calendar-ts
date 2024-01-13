import { Router } from 'express'
import { CalendarController } from './controller'
import { CalendarDatasourceImpl, CalendarRepositoryImpl } from '../../infrastructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ValidatorAdapter } from '../../config'
import { isDate } from '../../infrastructure/helpers/isDate'

export class CalendarRoutes {
  static get routes () {
    const router = Router()

    const datasource = new CalendarDatasourceImpl()
    const repository = new CalendarRepositoryImpl(datasource)
    const controller = new CalendarController(repository)

    router.post('/', [
      ValidatorAdapter.check('title', 'Title is required').notEmpty().isString(),
      ValidatorAdapter.check('notes', 'Notes must be string').isString(),
      ValidatorAdapter.check('start', 'Start date is required').notEmpty().custom(isDate),
      ValidatorAdapter.check('end', 'End date is required').notEmpty().custom(isDate),
      AuthMiddleware.validateData
    ], AuthMiddleware.validateJWT, controller.createEvent)

    return router
  }
}
