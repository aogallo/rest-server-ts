import { Response, Request } from 'express'

import { User, UserModel } from '@schemas/user'
import { userValidator } from '@validators/user'

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as User

    const validation = userValidator.safeParse(body)

    if (!validation.success) {
      return res.status(400).json({ success: false, error: validation.error })
    }

    const user = await UserModel.create(validation.data)

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
