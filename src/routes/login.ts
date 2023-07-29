import { login } from '../controllers/login'
import { Router } from 'express'
const loginRouter = Router()

loginRouter.post('/', login)

export default loginRouter
