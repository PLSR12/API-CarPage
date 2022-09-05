import cors from 'cors'
import express from 'express'
import { resolve } from 'path'
import routes from './routes'

import './database'

class App {
  constructor() {
    this.app = express()
    this.app.use(cors())

    this.middlewares()
    this.routes()
  }
  middlewares() {
    this.app.use(express.json())
    this.app.use(
      '/vehicle-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )

    this.app.use(
      '/brands-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )
  }
  routes() {
    this.app.use(routes)
  }
}

export default new App().app
