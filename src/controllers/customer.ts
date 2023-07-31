import { Request, Response } from 'express'

import { CustomerModel } from '@schemas/customer'

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const customer = CustomerModel.findById(id)

    if (customer == null) {
      return res.status(404)
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
