import { Request, Response } from 'express'
import _ from 'lodash'

import { Customer, CustomerModel } from '@schemas/customer'
import { customerValidator } from '@validators/customer'

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = req.body as Customer

    if (_.isEmpty(customer)) {
      return res
        .status(400)
        .json({ success: false, error: 'No hay data que actualizar' })
    }

    const validator = customerValidator.partial().safeParse(customer)

    if (!validator.success) {
      return res
        .status(400)
        .json({ success: false, error: validator.error.issues })
    }

    const customerExists = await CustomerModel.findById(id)

    if (customerExists == null) {
      return res
        .status(404)
        .json({ success: false, error: 'El cliente no existe' })
    }

    const customerNameExists = await CustomerModel.findOne({
      $and: [
        {
          _id: {
            $ne: id,
          },
        },
        {
          $or: [
            {
              email: customer.email,
            },
            { name: customer.name },
          ],
        },
      ],
    })

    if (customerNameExists != null) {
      return res
        .status(400)
        .json({ success: false, error: 'El nombre o correo ya existe' })
    }

    await CustomerModel.findByIdAndUpdate(id, customer)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a customer ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
