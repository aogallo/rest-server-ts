import { DataSource } from 'typeorm'
import TreatmentPlan from './entities/treatment-plan'

const username = encodeURIComponent(process.env.USER_MONGO ?? 'manageruser')
const password = encodeURIComponent(
  process.env.PASSWORD_MONGO ?? 'IdXIl8BwmdFYoa41'
)

const url = `mongodb+srv://${username}:${password}@cluster0.c5tyaio.mongodb.net/?retryWrites=true&w=majority`

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  database: 'manager-system-dentist',
  url,
  useNewUrlParser: true,
  synchronize: true,
  logging: true,
  entities: [TreatmentPlan],
})
