import { Response, Request } from 'express'

import { UserModel } from '@schemas/user'

export const createUser = async (req: Request, res: Response) => {
  const body = req.body

  const user = await UserModel.create(body)

  res.status(200).json({ success: true, data: user })
}
