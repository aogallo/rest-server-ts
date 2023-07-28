import express, { Application } from 'express'
import * as mongoose from 'mongoose'
import tratamientPlanRouter from '../routes/treatment-plan'
import cors from 'cors'

export default class Server {
  private app: Application
  private port: string
  private apiPaths = {
    tratamientPlan: '/api/treatment-plan',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'

    this.middlewares()

    this.routes()
  }

  async connectToDatabase() {
    const mongoseInstance: mongoose.Mongoose = mongoose

    console.log('Connecting to database')

    const username = encodeURIComponent(process.env.USER_MONGO as string)
    const password = encodeURIComponent(process.env.PASSWORD_MONGO as string)

    const url = `mongodb+srv://${username}:${password}@cluster0.c5tyaio.mongodb.net/?retryWrites=true&w=majority`

    if (process.env.NODE_ENV === 'test') {
      await mongoose.connect(url, { dbName: 'manager-system-dentist-test' })
    } else {
      await mongoose.connect(url, { dbName: 'manager-system-dentist' })
    }

    console.log('Connected to database')

    return mongoseInstance.connection
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
}
