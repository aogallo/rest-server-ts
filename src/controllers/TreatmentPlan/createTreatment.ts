import { TreatmentPlan, TreatmentPlanModel } from '@schemas/treatment-plan'
import { Request, Response } from 'express'

export const createTratamientPlan = async (req: Request, res: Response) => {
  const body = req.body as TreatmentPlan

  const treatmentPlan = await TreatmentPlanModel.create(body)

  res.status(201).json({
    success: true,
    data: treatmentPlan,
  })
}
