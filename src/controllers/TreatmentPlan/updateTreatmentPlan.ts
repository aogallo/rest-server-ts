import { Request, Response } from 'express'

import { TreatmentPlan, TreatmentPlanModel } from '@schemas/treatment-plan'

export const updateTratamientPlan = async (req: Request, res: Response) => {
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
}
