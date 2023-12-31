import express, { type Router } from 'express'

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

  }
}
