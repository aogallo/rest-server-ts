import { DataSource } from 'typeorm'
import TreatmentPlan from './entities/treatment-plan'

const username = encodeURIComponent(process.env.USER_MONGO ?? 'manageruser')
const password = encodeURIComponent(
  process.env.PASSWORD_MONGO ?? 'IdXIl8BwmdFYoa41'
)

// const host = `mongodb+srv://${username}:${password}@cluster0.5hqi5nr.mongodb.net/?retryWrites=true&w=majority`
const host =
  'mongodb+srv://manageruser:Ih1cO0mnvovwXpab@cluster0.5hqi5nr.mongodb.net/'
// ;('Ih1cO0mnvovwXpab')
// mongodb+srv://manageruser:Ih1cO0mnvovwXpab@cluster0.5hqi5nr.mongodb.net/

console.log('host', host)

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  // host: `mongodb+srv://${username}:AmW3fqydgCe4Q1DR@cluster0.5hqi5nr.mongodb.net/?retryWrites=true&w=majority`,
  host,
  database: 'manager-system-dentist',
  // synchronize: true,
  loggerLevel: 'debug',
  logging: true,
  entities: [TreatmentPlan],
})
