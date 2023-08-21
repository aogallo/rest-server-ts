import { Request, Response } from 'express'

import { CustomerModel } from '@schemas/customer'

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const customerExists = await CustomerModel.findById(id)

    if (customerExists == null) {
      return res
        .status(404)
        .json({ success: false, error: 'El cliente no existe' })
    }

    await CustomerModel.findByIdAndDelete(id)

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
