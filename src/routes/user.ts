import { Router } from 'express'

import { createUser } from '@controllers/User/createUser'
import { deleteUser } from '@controllers/User/deleteUser'
import { putUser } from '@controllers/User/putUser'
import { getUser, getUsers } from '@controllers/User/readUser'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', putUser)

export default userRouter
