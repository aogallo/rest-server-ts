import { DataSource } from 'typeorm'

export const MongoDataSource = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  database: 'test',
  synchronize: true,
  logging: false,
})
