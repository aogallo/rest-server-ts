import { Response, Request } from 'express'

import { UserModel } from '@schemas/user'

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const userExists = await UserModel.findById(id)

  if (userExists == null) {
    return res
      .status(404)
      .json({ success: false, error: 'El usuario no existe' })
  }

  await UserModel.findByIdAndDelete(id)

  res.status(204).send()
}
