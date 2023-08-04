import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import _ from 'lodash'

import { LoginType } from '@src/types'
import { UserModel } from '@schemas/user'
import { userValidator } from '@validators/user'

export const login = async (req: Request, res: Response) => {
  const body = req.body as LoginType

  if (_.isEmpty(body)) {
    return res
      .status(404)
      .json({ success: false, message: 'Usuario y password es requerido' })
  }

  const validator = userValidator.partial().safeParse(body)

  if (!validator.success) {
    return res
      .status(400)
      .json({ success: false, error: validator.error.issues })
  }

  const user = await UserModel.findOne({ username: validator.data.username })

  if (user == null) {
    return res
      .status(404)
      .json({ success: false, message: 'Usuario no encontrado' })
  }

  const passwordCorrect = await bcrypt.compare(
    validator.data.password as string,
    user.password
  )

  if (passwordCorrect == false) {
    return res
      .status(404)
      .json({ success: false, message: 'Usuario y password no son correctos' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const expiresIn =
    process.env.NODE_ENV === 'dev'
      ? process.env.EXPIRES_IN_DEV
      : process.env.EXPIRES_IN_PROD

  const token = jwt.sign(userForToken, process.env.SECRET as string, {
    expiresIn,
  })

  res.status(200).json({
    success: true,
    data: { token, username: user.username, name: user.name },
  })
}
