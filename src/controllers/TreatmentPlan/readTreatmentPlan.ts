import { Request, Response } from 'express'

import { TreatmentPlanModel } from '@schemas/treatment-plan'

export const getTratamientPlan = async (req: Request, res: Response) => {
  const { id } = req.params

  const treatmentPlan = await TreatmentPlanModel.findById(id)

  if (treatmentPlan == null) {
    return res.status(404).json({
      success: false,
      message: 'No exite el plan de tratamiento',
    })
  }

  res.json({
    success: true,
    data: treatmentPlan,
  })
}

export const getTratamientPlans = async (_req: Request, res: Response) => {
  const treatmentPlans = await TreatmentPlanModel.find()

  res.json({
    success: true,
    data: treatmentPlans,
  })
}
