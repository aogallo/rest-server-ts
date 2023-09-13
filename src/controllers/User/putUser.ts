import { Request, Response } from 'express'
import _ from 'lodash'

import { User, UserModel } from '@schemas/user'
import { userValidator } from '@validators/user'

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = req.body as User

  if (_.isEmpty(user)) {
    return res
      .status(400)
      .json({ success: false, error: 'No hay data que actualizar' })
  }

  const validator = userValidator.partial().safeParse(user)

  if (!validator.success) {
    return res
      .status(400)
      .json({ success: false, error: validator.error.issues })
  }

  const userExists = await UserModel.findById(id)

  if (userExists == null) {
    return res
      .status(404)
      .json({ success: false, error: 'El usuario no existe' })
  }

  const userByUnDuplicatedValues = await UserModel.findOne({
    $and: [
      {
        _id: {
          $ne: id,
        },
      },
      {
        $or: [
          {
            email: validator.data.email,
          },
          { name: validator.data.name },
        ],
      },
    ],
  })

  if (userByUnDuplicatedValues != null) {
    return res
      .status(400)
      .json({ success: false, error: 'El nombre o correo ya existe' })
  }

  await UserModel.findByIdAndUpdate(id, validator.data).populate('roles', {
    id: 1,
    name: 1,
    permissions: 1,
  })

  res.status(204).send()
}
