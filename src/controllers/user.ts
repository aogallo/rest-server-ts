import bcrypt from 'bcrypt'
import { Response, Request } from 'express'
import _ from 'lodash'

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

    const user = await UserModel.create(validator.data)

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

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const userData = await UserModel.findById(id)

    res.json({ success: true, data: userData })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const userData = await UserModel.find()

    res.json({ success: true, data: userData })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

export const putUser = async (req: Request, res: Response) => {
  try {
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

    await UserModel.findByIdAndUpdate(id, validator.data)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}

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
      console.log(`Error to retrieve a treatment plan ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
