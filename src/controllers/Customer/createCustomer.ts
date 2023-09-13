import { Request, Response } from 'express'

import { Customer, CustomerModel } from '@schemas/customer'
import { customerValidator } from '@validators/customer'

export const createCustomer = async (req: Request, res: Response) => {
  const customer = req.body as Customer

  const validator = customerValidator.safeParse(customer)

  if (!validator.success) {
    return res
      .status(400)
      .json({ success: false, error: validator.error.issues })
  }

  const customerNameExists = await CustomerModel.findOne({
    $or: [
      {
        email: customer.email,
      },
      { name: customer.name },
    ],
  })

  if (customerNameExists != null) {
    return res
      .status(400)
      .json({ success: false, error: 'El nombre o correo ya existe' })
  }

  const response = await CustomerModel.create(validator.data)

  res.status(201).json({ success: true, data: response })

  // res
  //   .status(500)
  //   .json({ success: false, error: 'Comuniquese con su administrador' })
}
