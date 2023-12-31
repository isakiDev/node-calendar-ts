import { Router } from 'express'

export class CalendarRoutes {
  static get routes () {
    const router = Router()

    router.get('/', (req, res) => {
      res.send('Calendar get')
    })

    return router
  }
}
