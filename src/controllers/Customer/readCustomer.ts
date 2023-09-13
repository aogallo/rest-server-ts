import { Request, Response } from 'express'

import { CustomerModel } from '@schemas/customer'

export const getCustomer = async (req: Request, res: Response) => {
  const { id } = req.params
  const customer = await CustomerModel.findById(id)

  if (customer == null) {
    return res.status(404).json({ success: false, data: null })
  }

  res.json({
    success: true,
    data: customer,
  })
}

export const getCustomers = async (_req: Request, res: Response) => {
  const customer = await CustomerModel.find()

  res.json({
    success: true,
    data: customer,
  })
}
