import { Connection } from 'mongoose'
import supertest, { SuperAgentTest } from 'supertest'
import { faker } from '@faker-js/faker'

import Server from '@core/server'
import { User } from '@schemas/user'

let server: Server
let connection: Connection
let agent: SuperAgentTest
const baseRoute = '/api/user'
const userTest: User = {
  id: '',
  name: faker.person.fullName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: faker.internet.password(),
}

beforeAll(async () => {
  server = new Server()
  agent = supertest.agent(server.getApp())
  connection = await server.connectToDatabase()
  await connection.dropCollection('users')
  const res = await agent.post(baseRoute).send(userTest)
  userTest.id = res.body.data.id
})

afterAll(async () => {
  // await connection.dropCollection('users')
  await server.disconnect()
})

describe.only('User Test /user', () => {
  it('POST: Create a user to be respone 200', async () => {
    const user: User = {
      id: '',
      name: faker.person.fullName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }

    const response = await agent.post(baseRoute).send(user)

    expect(response.body.data).toHaveProperty('id')
    expect(response.statusCode).toBe(200)
  })

  it('GET: Retrieve a user to be response 200', async () => {
    const response = await agent.get(`${baseRoute}/${userTest.id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toMatchObject(userTest)
  })

  it('GET: Retrieve all user to be response 200', async () => {
    const response = await agent.get(baseRoute)

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toHaveLength(2)
  })

  it('PUT: Update a user to be response 200', async () => {
    const userNameUpdated = 'test user updated'
    userTest.name = userNameUpdated
    const response = await agent
      .put(`${baseRoute}/${userTest.id}`)
      .send(userTest)

    expect(response.statusCode).toBe(204)
  })

  it('DELETE: Delete a user to be response 200', async () => {
    const response = await agent.delete(`${baseRoute}/${userTest.id}`)

    expect(response.statusCode).toBe(204)
  })
})
