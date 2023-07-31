import Server from '@core/server'
import { Connection } from 'mongoose'
import supertest, { SuperAgentTest } from 'supertest'

let server: Server
let connection: Connection
let agent: SuperAgentTest
const baseRoute = '/api/customer'

beforeAll(async () => {
  server = new Server()
  agent = supertest.agent(server.getApp())
  connection = await server.connectToDatabase()
  await connection.dropCollection('customers')
})

afterAll(async () => {
  // await connection.dropCollection('treatment_plans')
  await server.disconnect()
})

describe('Customer Test /customer', async () => {
  it('GET: Retrieve all customer to be response 200', async () => {
    const res = await agent.get(baseRoute)
    // expect(res.body.data).toHaveLength(1)

    expect(res.statusCode).toEqual(200)
  })
})
