import { Request, Response } from 'express'

import { Customer, CustomerModel } from '@schemas/customer'
import { customerValidator } from '@src/validators/customer'

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findById(id)

    if (customer == null) {
      return res.status(404).json({ success: false, data: null })
    }

    res.json({
      success: true,
      data: customer,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a customer ${error.message}`)
    }

    res.status(500).json({ success: false, data: null })
  }
}

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.find()

    res.json({
      success: true,
      data: customers,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a customer ${error.message}`)
    }

    res.status(500).json({ success: false, data: null })
  }
}

export const postCustomer = async (req: Request, res: Response) => {
  try {
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

    res.json({ success: true, data: response })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to retrieve a customer ${error.message}`)
    }

    res.status(500).json({ success: false, data: null })
  }
}
