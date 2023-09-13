import { UserModel } from '@schemas/user'
import { Request, Response } from 'express'

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const userData = await UserModel.findById(id).populate('roles', {
    id: 1,
    name: 1,
    permissions: 1,
  })

  res.json({ success: true, data: userData })
}

export const getUsers = async (_req: Request, res: Response) => {
  const userData = await UserModel.find().populate('roles', {
    id: 1,
    name: 1,
    permissions: 1,
  })

  res.json({ success: true, data: userData })
}
