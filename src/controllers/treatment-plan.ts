import { Request, Response } from 'express'
import { TreatmentPlanModel } from '../schemas/treatment-plan'

export const getTratamientPlan = async (req: Request, res: Response) => {
  const { id } = req.params
  const treatmentPlan = await TreatmentPlanModel.findById(id)

  res.json({
    success: true,
    data: treatmentPlan,
  })
}

export const getTratamientPlans = async (req: Request, res: Response) => {
  const treatmentPlans = await TreatmentPlanModel.find()

  res.json({
    success: true,
    data: treatmentPlans,
  })
}

export const postTratamientPlan = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const treatmentPlan = await TreatmentPlanModel.create(body)

    res.status(201).json({
      success: true,
      data: treatmentPlan,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).json({ success: false, data: null })
  }
}

export const putTratamientPlan = (req: Request, res: Response) => {
  const { id } = req.params
  const body = req.body

  res.json({
    msg: 'actualizar tratamiento',
    id,
  })
}

export const deleteTratamientPlan = (req: Request, res: Response) => {
  const { id } = req.params

  res.json({
    msg: 'eliminar tratamiento',
    id,
  })
}
