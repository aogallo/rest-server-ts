import express, { Application } from 'express'
import tratamientPlanRouter from '../routes/treatment-plan'
import cors from 'cors'
import { MongoDataSource } from '../data-source'

export default class Server {
  private app: Application
  private port: string
  private apiPaths = {
    tratamientPlan: '/api/treatment-plan',
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '8000'

    this.connectToDatabase()

    this.middlewares()

    this.routes()
  }

  connectToDatabase() {
    MongoDataSource.initialize()
      .then(() => console.debug('Data Source has been initialized!'))
      .catch((error) =>
        console.error(`Error during Data Source initilization ${error}`)
      )
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
    this.app.listen(this.port, () => {
      console.log(`Server is started on ${this.port} 😎🚀`)
    })
  }
}
