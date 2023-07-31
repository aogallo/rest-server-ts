import Server from '@core/server'
import { Connection } from 'mongoose'
import supertest, { SuperAgentTest } from 'supertest'

import { TreatmentPlan } from '@schemas/treatment-plan'

let server: Server
let connection: Connection
let agent: SuperAgentTest
const baseRoute = '/api/treatment-plan'
const treatmentPlanTest: TreatmentPlan = {
  name: 'treatmentPlanTest',
  id: '',
}

beforeAll(async () => {
  server = new Server()
  agent = supertest.agent(server.getApp())
  connection = await server.connectToDatabase()
  await connection.dropCollection('treatment_plans')
  const res = await agent.post(baseRoute).send(treatmentPlanTest)
  treatmentPlanTest.id = res.body.data._id
})

afterAll(async () => {
  // await connection.dropCollection('treatment_plans')
  await server.disconnect()
})

describe('Treatment Plan Test /treatment-plan', () => {
  const treatmentPlan = new TreatmentPlan()
  treatmentPlan.name = 'test-treatmenet-plan-13'

  it('GET: Retrieve all treatment plans to be response 200', async () => {
    const res = await agent.get(baseRoute)

    expect(res.body.data).toHaveLength(1)

    expect(res.statusCode).toEqual(200)
  })

  it('POST: Create a treatment plan to be response 201', async () => {
    const res = await agent.post(baseRoute).send(treatmentPlan)

    treatmentPlan.id = res.body.data._id

    expect(res.statusCode).toBe(201)
  })

  it('GET: Retrieve a treatment plans by Id to be response 200', async () => {
    const res = await agent.get(baseRoute + `/${treatmentPlan.id}`)

    expect(res.body.data).toHaveProperty('name')

    expect(res.statusCode).toEqual(200)
  })

  it('PUT: Update a treatment plan to be response 204', async () => {
    const res = await agent
      .put(baseRoute + `/${treatmentPlanTest.id}`)
      .send({ name: `${treatmentPlanTest.name}-updated` })

    expect(res.statusCode).toBe(204)
  })

  it('PUT Not Found Treatment Plan to be response 404', async () => {
    const res = await agent
      .put(baseRoute + `/64c42a79b7b5429e08bfe3a8`)
      .send({ name: `${treatmentPlanTest.name}-updated` })

    expect(res.statusCode).toBe(404)
  })

  it('DELETE: Delete a treatment plan to be resposne 204', async () => {
    const res = await agent.delete(baseRoute + `/${treatmentPlanTest.id}`)

    expect(res.statusCode).toBe(204)
  })

  it('DELETE: Not Found a treatment plan to be resposne 404', async () => {
    const res = await agent.delete(baseRoute + `/64c42a79b7b5429e08bfe3a8`)

    expect(res.statusCode).toBe(404)
  })
})
