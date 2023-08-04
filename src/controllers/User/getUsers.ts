import { UserModel } from '@schemas/user'
import { Request, Response } from 'express'

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const userData = await UserModel.find().populate('roles', {
      id: 1,
      name: 1,
      permissions: 1,
    })

    res.json({ success: true, data: userData })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error to retrieve all users: ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
