import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'

import { LoginType } from 'src/types'
import { UserModel } from '@schemas/user'

export const login = async (req: Request, res: Response) => {
  const body = req.body as LoginType

  const user = await UserModel.findOne({ username: body.username })

  if (user == null) {
    return res
      .status(404)
      .json({ success: false, message: 'Usuario no encontrado' })
  }

  const passwordCorrect = await bcrypt.compare(body.password, user.password)

  if (passwordCorrect == false) {
    return res
      .status(404)
      .json({ success: false, message: 'Usuario no encontrado' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET as string)

  res.status(200).json({
    success: true,
    data: { token, username: user.username, name: user.name },
  })
}
