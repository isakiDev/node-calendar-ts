import express, { type Router } from 'express'
// import { corsAdapter } from '../config'
import cors from 'cors'

interface Options {
  port: number
  publicPath?: string
  routes: Router
}

export class Server implements Options {
  public readonly app = express()

  public readonly port: number
  public readonly publicPath: string
  public readonly routes: Router

  constructor ({ port, routes, publicPath = 'public' }: Options) {
    this.port = port
    this.publicPath = publicPath
    this.routes = routes
  }

  start () {
    this.app.use(express.json())
    // this.app.use(corsAdapter())
    this.app.use(cors({ origin: '*' }))
    this.app.use(this.routes)
    this.app.use(express.static(this.publicPath))

    this.app.listen(this.port, () => {
      console.log(`Server listen in port http://localhost:${this.port}`)
    })
  }
}
