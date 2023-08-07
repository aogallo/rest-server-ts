import { Request, Response } from 'express'

import { TreatmentPlan, TreatmentPlanModel } from '@schemas/treatment-plan'

export const updateTratamientPlan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const body = req.body as TreatmentPlan

    const treatmentPlan = await TreatmentPlanModel.findById(id)

    if (treatmentPlan == null) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      })
    }

    await TreatmentPlanModel.findByIdAndUpdate(id, body)

    res.status(204).send()
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to update a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
