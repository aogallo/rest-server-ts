import { TreatmentPlan, TreatmentPlanModel } from '@schemas/treatment-plan'
import { Request, Response } from 'express'

export const createTratamientPlan = async (req: Request, res: Response) => {
  try {
    const body = req.body as TreatmentPlan

    const treatmentPlan = await TreatmentPlanModel.create(body)

    res.status(201).json({
      success: true,
      data: treatmentPlan,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error to create a treatment plan ${error.message}`)
    }

    res
      .status(500)
      .json({ success: false, error: 'Comuniquese con su administrador' })
  }
}
