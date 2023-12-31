import { Server } from './presentation/server'
import { envs } from './config'
import { AppRoutes } from './presentation'
import { MongoDatabase } from './data'

(async () => {
  await MongoDatabase.connect({
    dbName: 'Calendar',
    mongoUrl: envs.DB_CNN
  })

  main()
})()

function main () {
  new Server({
    port: envs.PORT ?? 0,
    routes: AppRoutes.routes
  }).start()
}
