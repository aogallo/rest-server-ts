import { Request, Response } from 'express'

import { Role, RoleModel } from '@schemas/role'
import { roleValidator } from '@validators/role'

export const postRole = async (req: Request, res: Response) => {
  try {
    const role = req.body as Role

    const validator = roleValidator.safeParse(role)

    if (!validator.success) {
      return res
        .status(400)
        .json({ success: false, error: validator.error.issues })
    }

    const roleExists = await RoleModel.findOne({ name: validator.data.name })

    if (roleExists != null) {
      return res
        .status(400)
        .json({ success: false, error: 'El role ya existe' })
    }

    const response = await RoleModel.create(validator.data)

    res.json({
      success: true,
      data: response,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error to create a role: ${error.message}`)
    }
    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
