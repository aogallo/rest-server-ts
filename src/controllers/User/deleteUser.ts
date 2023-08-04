import { Response, Request } from 'express'

import { UserModel } from '@schemas/user'

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const userExists = await UserModel.findById(id)

    if (userExists == null) {
      return res
        .status(404)
        .json({ success: false, error: 'El usuario no existe' })
    }

    await UserModel.findByIdAndDelete(id)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error to delete a user: ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
