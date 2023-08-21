import express, { Application } from 'express'
import cors from 'cors'
import * as mongoose from 'mongoose'
import morgan from 'morgan'
import helmet from 'helmet'

import loginRouter from '@routes/login'
import tratamientPlanRouter from '@routes/treatmentPlan'
import customerRouter from '@routes/customer'
import userRouter from '@routes/user'
import roleRouter from '@routes/role'

export default class Server {
  private app: Application
  private port: string
  private prefix = '/api/'
  private apiPaths = {
    tratamientPlan: `${this.prefix}treatment-plan`,
    user: `${this.prefix}user`,
    login: `${this.prefix}login`,
    customer: `${this.prefix}customer`,
    role: `${this.prefix}role`,
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

    const url =
      process.env.MONGO_URI?.replace('username', username).replace(
        'password',
        password
      ) || ''

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
    //disable x-powered-by
    this.app.disable('x-powered-by')

    //CORS
    this.app.use(
      cors({
        origin: ['http://localhost:8000','http://localhost:5173'],
        methods: 'GET,PUT,POST,DELETE',
      })
    )

    // Parser body
    this.app.use(express.json())

    //morgan route logger
    this.app.use(
      morgan('tiny', { skip: () => process.env.NODE_ENV === 'test' })
    )

    // helmet for save applicaton for some vulnerabilities
    this.app.use(helmet())
  }

  routes() {
    this.app.use(this.apiPaths.tratamientPlan, tratamientPlanRouter)
    this.app.use(this.apiPaths.login, loginRouter)
    this.app.use(this.apiPaths.customer, customerRouter)
    this.app.use(this.apiPaths.user, userRouter)
    this.app.use(this.apiPaths.role, roleRouter)
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
