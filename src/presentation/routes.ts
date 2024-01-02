import { Router } from 'express'
import { AuthRoutes, CalendarRoutes } from '.'

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
