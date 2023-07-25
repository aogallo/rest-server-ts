import dotenv from 'dotenv'
import 'reflect-metadata'
import Server from './core/server'

dotenv.config()

const server = new Server()

server.listen()
