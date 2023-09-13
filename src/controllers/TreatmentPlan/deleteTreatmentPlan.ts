import { TreatmentPlanModel } from '@schemas/treatment-plan'
import { Request, Response } from 'express'

export const deleteTratamientPlan = async (req: Request, res: Response) => {
  const { id } = req.params

  const treatmentPlan = await TreatmentPlanModel.findById(id)

  if (treatmentPlan == null) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    })
  }

  await TreatmentPlanModel.findByIdAndDelete(id)

  res.status(204).send()
}
