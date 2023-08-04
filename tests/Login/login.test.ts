import { faker } from '@faker-js/faker'
import { Connection } from 'mongoose'
import supertest, { SuperAgentTest } from 'supertest'

import Server from '@core/server'
import { User } from '@schemas/user'

let server: Server
let connection: Connection
let agent: SuperAgentTest
const baseRoute = '/api'
const userTest: User = {
  id: '',
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName().toLowerCase(),
  password: faker.internet.password(),
}

beforeAll(async () => {
  server = new Server()
  agent = supertest.agent(server.getApp())
  connection = await server.connectToDatabase()
  await connection.dropCollection('users')
  const res = await agent.post(`${baseRoute}/user`).send(userTest)
  userTest.id = res.body.data.id
})

afterAll(async () => {
  // await connection.dropCollection('users')
  await server.disconnect()
})

describe.only('Login Test /login', () => {
  it('POST: Login in the application to be response 200', async () => {
    const response = await agent
      .post(`${baseRoute}/login`)
      .send({ username: userTest.username, password: userTest.password })

    console.log(response.body)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveProperty('token')
    expect(response.body.data).toHaveProperty('username')
    expect(response.body.data).toHaveProperty('name')
  })
})
