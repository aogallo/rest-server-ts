import Server from '@core/server'

let server: Server
beforeAll(() => {
  server = new Server()
})

afterAll(() => {
  server.disconnect()
})
