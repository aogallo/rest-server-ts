import { createUser, getUser, getUsers } from '@controllers/user'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)

export default userRouter
