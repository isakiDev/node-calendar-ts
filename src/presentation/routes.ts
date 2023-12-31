import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { CalendarRoutes } from './calendar/routes'

export class AppRoutes {
  static get routes () {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/calendar', CalendarRoutes.routes)

    router.use('*', (req, res) => {
      res.send('Welcome to my Api')
    })

    return router
  }
}
