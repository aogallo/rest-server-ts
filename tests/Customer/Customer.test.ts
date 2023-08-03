import { Connection } from 'mongoose'
import supertest, { SuperAgentTest } from 'supertest'
import { faker } from '@faker-js/faker'

import Server from '@core/server'
import { Customer } from '@schemas/customer'

let server: Server
let connection: Connection
let agent: SuperAgentTest
const baseRoute = '/api/customer'
const customerTest: Customer = {
  id: '',
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: faker.location.direction(),
  phone: faker.phone.number(),
}

beforeAll(async () => {
  server = new Server()
  agent = supertest.agent(server.getApp())
  connection = await server.connectToDatabase()
  await connection.dropCollection('customers')
  const res = await agent.post(baseRoute).send(customerTest)
  customerTest.id = res.body.data.id
})

afterAll(async () => {
  await connection.dropCollection('customers')
  await server.disconnect()
})

describe.only('Customer Test /customer', () => {
  it('GET: Retrieve all customer to be response 200', async () => {
    const res = await agent.get(baseRoute)
    expect(res.body.data).toHaveLength(1)
    expect(res.statusCode).toEqual(200)
  })

  it('GET: Retrieve a customer to be response 200', async () => {
    const res = await agent.get(`${baseRoute}/${customerTest.id}`)
    expect(res.body.data).toHaveProperty('id')
    expect(res.body.data).toMatchObject(customerTest)
    expect(res.statusCode).toEqual(200)
  })

  it('POST: Create a customer to be response 200', async () => {
    const customer: Customer = {
      id: '',
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.direction(),
      phone: faker.phone.number(),
    }
    const res = await agent.post(baseRoute).send(customer)
    customer.id = res.body.data.id
    expect(res.statusCode).toEqual(200)
  })

  it('PUT: Update a customer to be response 200', async () => {
    customerTest.name = faker.person.fullName()

    const res = await agent
      .put(`${baseRoute}/${customerTest.id}`)
      .send(customerTest)

    console.log(res.body.error)

    expect(res.statusCode).toBe(204)
  })

  it('PUT: Update a customer to be response 400', async () => {
    customerTest.name = faker.person.fullName()

    const res = await agent.put(`${baseRoute}/${customerTest.id}`)

    expect(res.statusCode).toBe(400)
  })

  it.only('DELETE: Delete a customer to be response 200', async () => {
    const res = await agent.delete(`${baseRoute}/${customerTest.id}`)

    expect(res.statusCode).toBe(204)
  })
})
