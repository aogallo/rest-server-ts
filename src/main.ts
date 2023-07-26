import 'dotenv/config'
import 'reflect-metadata'
import Server from './core/server'

console.log('port', process.env.PORT)

const server = new Server()

server.listen()
