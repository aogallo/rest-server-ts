import { Request, Response } from 'express'

import { CustomerModel } from '@schemas/customer'

export const getCustomers = async (_req: Request, res: Response) => {
  try {
    const customers = await CustomerModel.find()

    res.json({
      success: true,
      data: customers,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error to retrieve all customers: ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
