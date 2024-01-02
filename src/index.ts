import { envs } from './config'
import { AppRoutes, Server } from './presentation'
import { MongoDatabase } from './data/mongo'

(async () => {
  await main()
})()

async function main () {
  await MongoDatabase.connect({
    dbName: 'calendar',
    mongoUrl: envs.DB_CNN
  })

  new Server({
    port: envs.PORT ?? 0,
    routes: AppRoutes.routes
  }).start()
}
