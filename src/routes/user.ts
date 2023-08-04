import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  putUser,
} from '@controllers/user'

const userRouter = Router()

userRouter.post('/', createUser)
userRouter.get('/', getUsers)
userRouter.get('/:id', getUser)
userRouter.delete('/:id', deleteUser)
userRouter.put('/:id', putUser)

export default userRouter
