import { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { RoleModel } from '@schemas/role'
import { User, UserModel } from '@schemas/user'
import { userValidator } from '@validators/user'

export const createUser = async (req: Request, res: Response) => {
  try {
    const body = req.body as User

    const validator = userValidator.safeParse(body)

    if (!validator.success) {
      return res
        .status(400)
        .json({ success: false, error: validator.error.issues })
    }

    const userByUnDuplicatedValues = await UserModel.findOne({
      $or: [
        {
          email: validator.data.email,
        },
        { name: validator.data.name },
      ],
    })

    if (userByUnDuplicatedValues != null) {
      return res
        .status(400)
        .json({ success: false, error: 'El nombre o correo ya existe' })
    }

    validator.data.password = await bcrypt.hash(validator.data.password, 10)

    const roles = await RoleModel.find({
      name: { $in: validator.data.roles },
    })

    if (roles.length <= 0) {
      return res
        .status(400)
        .json({ success: false, error: 'El o los roles no existen' })
    }

    const user = await UserModel.create({ ...validator.data, roles: roles })

    await user?.populate('roles', {
      id: 1,
      name: 1,
      permissions: 1,
    })

    res.status(201).json({ success: true, data: user })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
