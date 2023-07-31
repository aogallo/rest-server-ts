import express, { Application } from 'express'
import cors from 'cors'
import * as mongoose from 'mongoose'

import loginRouter from '@routes/login'
import tratamientPlanRouter from '@routes/treatment-plan'

export default class Server {
  private app: Application
  private port: string
  private prefix = '/api/'
  private apiPaths = {
    tratamientPlan: `${this.prefix}treatment-plan`,
    user: `${this.prefix}user`,
    login: `${this.prefix}login`,
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'

    this.middlewares()

    this.routes()
  }

  async connectToDatabase() {
    console.log('Connecting to database')

    const username = encodeURIComponent(process.env.USER_MONGO as string)
    const password = encodeURIComponent(process.env.PASSWORD_MONGO as string)

    let testConnection

    const url = `mongodb+srv://${username}:${password}@cluster0.c5tyaio.mongodb.net/?retryWrites=true&w=majority`

    if (process.env.NODE_ENV === 'test') {
      testConnection = await mongoose.connect(url, {
        dbName: 'manager-system-dentist-test',
      })
    } else {
      testConnection = await mongoose.connect(url, {
        dbName: 'manager-system-dentist',
      })
    }

    console.log('Connected to database')

    return testConnection.connection
  }

  async disconnect() {
    await mongoose.disconnect()
  }

  middlewares() {
    //CORS
    this.app.use(cors({}))

    // Parser body
    this.app.use(express.json())

    //public folder
  }

  routes() {
    this.app.use(this.apiPaths.tratamientPlan, tratamientPlanRouter)
    this.app.use(this.apiPaths.login, loginRouter)
  }

  listen() {
    this.connectToDatabase()
      .then(() => {
        this.app.listen(this.port, () => {
          console.log(`Server is started on ${this.port} 😎🚀`)
        })
      })
      .catch((error) => console.error(`Error to connecting to dabase ${error}`))
  }

  getApp() {
    return this.app
  }
}
