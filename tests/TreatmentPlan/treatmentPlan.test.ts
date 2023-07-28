import Server from '@core/server'
import { TreatmentPlan } from '@schemas/treatment-plan'
import { Connection } from 'mongoose'
import supertest from 'supertest'

let server: Server
let connection: Connection

beforeAll(async () => {
  server = new Server()
  connection = await server.connectToDatabase()
})

afterAll(async () => {
  await connection.dropCollection('treatment_plans')
  await server.disconnect()
})

describe('Treatment Plan Test /treatment-plan', () => {
  it('GET ', async () => {
    const res = await supertest(server.getApp()).get('/api/treatment-plan')

    expect(res.statusCode).toEqual(200)
  })

  it('POST', async () => {
    const treatmentPlan = new TreatmentPlan()
    treatmentPlan.name = 'test-treatmenet-plan-13'

    const res = await supertest(server.getApp())
      .post('/api/treatment-plan')
      .send(treatmentPlan)

    expect(res.statusCode).toBe(201)
  })
})
