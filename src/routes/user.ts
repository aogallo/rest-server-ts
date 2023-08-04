import { Router } from 'express'

import { deleteUser, getUser, getUsers, putUser } from '@controllers/user'
import { createUser } from '@controllers/User/createUser'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', putUser)

export default userRouter
