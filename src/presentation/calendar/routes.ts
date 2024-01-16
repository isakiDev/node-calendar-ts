import { Router } from 'express'
import { CalendarController } from './controller'
import { CalendarDatasourceImpl, CalendarRepositoryImpl, isDate } from '../../infrastructure'
import { AuthMiddleware } from '../middlewares/auth.middleware'
import { ValidatorAdapter } from '../../config'

export class CalendarRoutes {
  static get routes () {
    const router = Router()

    const datasource = new CalendarDatasourceImpl()
    const repository = new CalendarRepositoryImpl(datasource)
    const controller = new CalendarController(repository)

    router.use(AuthMiddleware.validateJWT)

    router.post('/',
      [
        ValidatorAdapter.check('title', 'Title is required').notEmpty().isString(),
        ValidatorAdapter.check('start', 'Start date is required').notEmpty().custom(isDate),
        ValidatorAdapter.check('end', 'End date is required').notEmpty().custom(isDate),
        AuthMiddleware.validateData
      ],
      controller.createEvent
    )

    router.put('/:id',
      [
        ValidatorAdapter.check('id').isMongoId().withMessage('Invalid id'),
        ValidatorAdapter.check('title', 'Title is required').notEmpty().isString(),
        ValidatorAdapter.check('start', 'Start date is required').notEmpty().custom(isDate),
        ValidatorAdapter.check('end', 'End date is required').notEmpty().custom(isDate),
        AuthMiddleware.validateData
      ],
      controller.updateEvent
    )

    router.delete('/:id',
      [
        ValidatorAdapter.check('id').isMongoId().withMessage('Invalid id'),
        AuthMiddleware.validateData
      ],
      controller.deleteEvent
    )

    router.get('/', controller.getEvents)

    return router
  }
}
